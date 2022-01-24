const Parser = require('rss-parser')
const request = require('then-request');
const parser = new Parser({
    headers: {
        'Accept': 'application/atom+xml'
    }
})

const Handlebars = require('handlebars')
const source = require('./templateREADME')
const template = Handlebars.compile(source)
const { Octokit } = require("@octokit/core")
const { createActionAuth } = require("@octokit/auth-action")
const auth = createActionAuth()

/** @type String - URL to the YouTube SAP Tech Bytes Playlist */
const URLYouTube1 = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL6RpkC85SLQC3HBShmlMaPu_nL--4f20z'
/** @type String - URL to the YouTube SAP 2 Minutes Of Playlist */
const URLYouTube2 = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PL6RpkC85SLQBM78mD6AiJ1vKlSB7OWtUz'
/** @type String - URL to query SAP Community for all Blogposts with tag sap-tech-bytes */
const URLSCN = 'https://content.services.sap.com/feed?type=blogpost&tags=sap-tech-bytes'

const sort_by = (field, reverse, primer) => {
    const key = primer ?
        (x) => {
            return primer(x[field])
        } :
        (x) => {
            return x[field]
        }
    reverse = !reverse ? 1 : -1
    return (a, b) => {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a))
    }
}

const branchProcessing = async (item, octokit) => {
    let branchDetails = await octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
        owner: 'SAP-samples',
        repo: 'sap-tech-bytes',
        branch: item.name
    })
    item.url = branchDetails.data._links.html
    item.authorName = branchDetails.data.commit.author.login
    item.authorURL = branchDetails.data.commit.author.html_url
    item.authorAvatar = branchDetails.data.commit.author.avatar_url
    return Promise.resolve(item)
}

const getBranches = async octokit => {
    //Read List of Branches in the SAP Tech Bytes Repo
    let branches = await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: 'SAP-samples',
        repo: 'sap-tech-bytes'
    })

    //Delete the main branch from the list
    let indexOfMain = branches.data.indexOf(branches.data.find(obj => {
        return obj.name === 'main'
    }))
    if (indexOfMain !== -1) { branches.data.splice(indexOfMain, 1) }

    //Sort by branch name 
    branches.data.sort(sort_by('name', true, (a) => a.toUpperCase()))

    //Return the most recent 6 branches and lookup the details for each branch
    branchesNew = await Promise.all(branches.data.slice(0, 6).map(item => branchProcessing(item, octokit)))

    return branchesNew
}

const getBlogPosts = async _ => {
    //Read List of Blog Posts in the SAP Community Netwwork with tag sap-tech-bytes
    const feed = await parser.parseURL(URLSCN)

    //Sort by date
    feed.items.sort(sort_by('pubDate', true))

    //Return the most recent 6 Blog Posts
    const items = feed.items.slice(0, 6).map(item => {
        item.date = new Date(item.pubDate).toDateString()
        return item
    })
    return items
}

const getYoutubeVideos = async _ => {
    //Read List of Videos in the SAP Tech Bytes Playlist on YouTube
    const feedNew1 = await parser.parseURL(URLYouTube1)

    //Add List of Videos in the "2 Minutes of..." Playlist
    const feedNew2 = await parser.parseURL(URLYouTube2)

    //Concat Lists of Videos
    const feedItems = [...feedNew1.items, ...feedNew2.items]
    
    //Sort by date
    feedItems.sort(sort_by('pubDate', true))
    
    //Return the most recent 6 Videos
    const itemsNew = feedItems.slice(0, 6).map(item => {
        item.date = new Date(item.pubDate).toDateString()
        return item
    })
    return itemsNew
}

const getStaticREADME = async _ => {
    const fs = require('fs')
    return [readme1, readme2] = await Promise.all([
        fs.readFileSync('./README1.md', 'utf8'),
        fs.readFileSync('./README2.md', 'utf8')
    ])
}

const main = async _ => {
    try {
        const authentication = await auth()
        const octokit = new Octokit({ auth: authentication.token })
        let [branches, blogPosts, videos, [readme1, readme2]] = await Promise.all([
            getBranches(octokit),
            getBlogPosts(),
            getYoutubeVideos(),
            getStaticREADME()
        ])
        console.log(template({ readme1, readme2, blogPosts, videos, branches }))
    } catch (error) {
        console.log(`${error}`)
        process.exit(1)
    }
}

main()
