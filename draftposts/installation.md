_Install the btp CLI to be ready to start exploring its features and functions._

The SAP BTP Command Line Interface (aka btp CLI) is a great tool for administering accounts and related resources on the SAP Business Technology Platform (BTP). It's a super fit for devops and cloud native activities as it's a command line tool that is both interactive and scriptable. And as we all know, [#TheFutureIsTerminal](https://blogs.sap.com/tag/thefutureisterminal/), right?

It's available for download from the [cloud section of the SAP Development Tools site](https://tools.hana.ondemand.com/#cloud) - now would be a great time to install it to start exploring and understanding what it can do for you.

The relevant documentation on the btp CLI is here: [Account Administration Using the SAP BTP Command Line Interface (btp CLI) [Feature Set B]](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/7c6df2db6332419ea7a862191525377c.html).

If you're not sure how you're going to use the btp CLI for real yet, and just want a throw-away experience for now, this post is what you need - it will take you through installing it in the cloud using a script that you can then use in your own command line context later. All you'll need for now is a BTP trial account with Feature Set B. You'll be installing and using it within the SAP Business Application Studio (App Studio) context.

## Set up

Log into your [trial account on BTP](https://account.hanatrial.ondemand.com/trial/#/home/trial) and jump to the App Studio context from the welcome page. Create a new dev space - you don't need anything special, just the "Basic" type will do - and jump into it when it's started up.

Make this your CLI in the cloud - you don't need any file explorer, or even any file editor, so click the Explorer "folders" icon to toggle it off, close any open files (including the Welcome page) and open a Terminal, dragging the vertical divider to the top for maximum space. That's better!

You can just download the btp CLI from the SAP Development Tools site mentioned earlier, which would be fine. But I prefer a script to help me not only download and unpack it, but also to let me check what the latest version is, and also have a slightly more flexible version management approach. So I wrote one, and we'll use that together here.

It's available in the SAP Tech Bytes repository branch associated with this post: [getbtpcli](https://github.com/SAP-samples/sap-tech-bytes/blob/2021-09-01-btp-cli/getbtpcli), and we'll grab it from within our App Studio terminal session now.

## Get the download script

In your terminal, run this to grab the script:

```shell
curl \
  --remote-name \
  --location \
  --url "https://raw.githubusercontent.com/SAP-samples/sap-tech-bytes/2021-09-01-btp-cli/getbtpcli" \
  && chmod +x getbtpcli
```

This uses `curl` to fetch the raw script file, saving it to a file of the same name, following any HTTP redirects that the server might return. It then sets the executable mode bit for the file so we can run it.

## Run the download script

You can run the script in test mode, just to get it to tell you what the latest version of the btp CLI is. Do this now:

```bash
./getbtpcli --test
```

This will give you something like this:

```
Latest version is 2.8.0
```

Running the script without the test mode option will download and install it. Do that now:

```bash
./getbtpcli
```

This will ask you first to confirm your acceptance of the licence agreement, before downloading and unpacking the executable; it will tell you what the version is, too:

```
Proceed (with Enter) only if you accept the SAP Developer Licence 3.1
(see https://tools.hana.ondemand.com/developer-license-3_1.txt) ...
Latest version is 2.8.0
```

Where has the executable been placed? By default, the `getbtpcli` script will put it in a `bin/` directory in your user's home directory (i.e. `$HOME/bin/`). Have a look now to see:

```bash
ls -l $HOME/bin/
```

This will output something like this:

```
lrwxrwxrwx 1 user group        9 Sep  1 09:40 btp -> btp-2.8.0
-rwxr-xr-x 1 user group 10868080 Jul 29 15:09 btp-2.8.0
```

Note that there are two files; the actual binary, called `btp-2.8.0` and a symbolic link, `btp`, which points to that binary. This is so that in the future we can have a new version of the binary, use that by default (by setting the symbolic link `btp` to point to that new one), but keep the old one too. There may be circumstances when you need a different version of the binary (the client-server design of the btp CLI is very flexible and powerful).

You can of course add the `bin/` directory to your shell's `$PATH`, so that you can just invoke `btp` as-is. Do it for this particular terminal session right now, like this:

```bash
export PATH="$PATH:$HOME/bin"
```

You can also add this line to the `.bashrc` file in your home directory; this is executed each time you start a new session.

## Invoke the btp CLI for the first time

Running `btp` now will give you a nice welcome message that looks something like this:

```
Welcome to the SAP BTP command line interface (client v2.8.0)

Usage: btp [OPTIONS] ACTION [GROUP/OBJECT] [PARAMS]

CLI server URL:                    not set
User:                              not set
Configuration:                     /home/user/.cache/.btp/config.json

You are currently not logged in.

Tips:
  To log in to a global account of SAP BTP, use 'btp login'. For help on login, use 'btp --help login'.
  To display general help, use 'btp --help'.

OK
```

The welcome message confirms the version you have, and also gives you information about what server you're connected to and what user and login information is currently active, if any.

## Wrapping up

You now have the btp CLI installed in a convenient place where you can start to try things out. You also have a script that you can use to keep your btp CLI up to date.

Let me know in the comments whether you've managed to set up the btp CLI like this, and if you have your own way of managing versions and downloads. I'd love to see how you do it! Also, if you have any questions about `getbtpcli` itself, feel free to ask - no question is too simple.

In the next post we take our first steps with the btp CLI by logging in and understanding what's going on: [SAP Tech Bytes: btp CLI - logging in](https://blogs.sap.com/2021/09/07/sap-tech-bytes-btp-cli-logging-in/).

---

![](https://blogs.sap.com/wp-content/uploads/2021/02/screenshot-2021-02-22-at-11.00.25.png)


SAP Tech Bytes is an initiative to bring you bite-sized information on all manner of topics, in [video](https://www.youtube.com/playlist?list=PL6RpkC85SLQC3HBShmlMaPu_nL--4f20z) and [written](https://blogs.sap.com/tag/sap-tech-bytes/) format. Enjoy!
