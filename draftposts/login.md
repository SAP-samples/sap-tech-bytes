_Start exploring with the btp CLI by logging in, then finding and selecting a subaccount for subsequent activities._

This is a follow-on post from the previous one: [SAP Tech Bytes - btp CLI installation](https://blogs.sap.com/2021/09/01/sap-tech-bytes-btp-cli-installation/) and assumes you've got it set up according to that post, in an SAP Business Application Studio (App Studio) dev space, with the location of the `btp` binary (in `$HOME/bin/`) added to the environment variable `$PATH` so that you can invoke it simply as `btp`.

Previously I made a brief mention of the client-server nature of the btp CLI. The fact that you're running a command line interface to connect to and control remote services more or less pre-supposes that architecture; moreover, it's a great way for the team to provide an abstraction between the btp CLI command structure and surface area and the services and entities on the platform itself.

Invoke `btp` from a terminal and stare at the output for a moment; it should look something like this:

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

There's a lot to unpack here. Briefly:

* the version of the client is confirmed (2.8.0)
* there's a well-defined structure to the command syntax
* we connect to a server via a URL
* we're not logged in
* configuration is stored locally in a JSON file
