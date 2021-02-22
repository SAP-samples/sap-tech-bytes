module.exports = `
{{readme1}}
 
## Recent Branches
{{#branches}}- [{{{name}}}]({{{url}}}) by [{{{authorName}}}]({{{authorURL}}}) 
{{/branches}}

## Recent Blog Posts
{{#blogPosts}}- [{{{title}}}]({{{id}}}) by {{author}} ({{date}})
  - {{summary}}
{{/blogPosts}} 
- More on [SAP Community Blog](https://blogs.sap.com/tag/sap-tech-bytes/)
    
## Recent Videos
{{#videos}}- [{{{title}}}]({{{link}}}) ({{date}})
{{/videos}}
- More on [SAP Developers YouTube Channel](https://www.youtube.com/playlist?list=PL6RpkC85SLQC3HBShmlMaPu_nL--4f20z)

{{readme2}}`
