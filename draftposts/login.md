_Start exploring with the btp CLI by logging in, then finding and selecting a subaccount for subsequent activities._

This is a follow-on post from the previous one: [SAP Tech Bytes - btp CLI installation](https://blogs.sap.com/2021/09/01/sap-tech-bytes-btp-cli-installation/) and assumes you've got it set up according to that post, in an SAP Business Application Studio (App Studio) dev space, with the location of the `btp` binary (in `$HOME/bin/`) added to the environment variable `$PATH` so that you can invoke it simply as `btp`.

Previously I made a brief mention of the client-server nature of the btp CLI. The fact that you're running a command line interface to connect to and control remote services more or less pre-supposes that architecture; moreover, it's a great way for the team to provide an abstraction between the btp CLI command structure and surface area and the services and entities on the platform itself.

## Invoking btp

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

## Logging in

Initiate the login process:

```
btp login
```

You should see, and respond, like this:

```
SAP BTP command line interface (client v2.8.0)

CLI server URL [https://cpcli.cf.eu10.hana.ondemand.com]>
Connecting to CLI server at https://cpcli.cf.eu10.hana.ondemand.com...

Global account subdomain>82715b8dtrial-ga
User>sapdeveloper@example.com
Password>********

Login successful
We stored your configuration file at: /home/user/.cache/.btp/config.json

Current target:
  Global account (subdomain: 82715b8dtrial-ga)

Tip:
  For more information on the targeting mechanism, use 'btp --help target'.

OK
```

In the trial context, which we're in here, the default CLI server that
is suggested (`https://cpcli.cf.eu10.hana.ondemand.com`) is appropriate.


Additionally, the global account subdomain is just your global account identifier with a `-ga` suffix. Here's a screenshot of the temporary trial account I set up for this set of examples, where the relationship between the global account identifier and the global account subdomain can be seen.

![Screenshot of account explorer](images/account-explorer.png)

Note that when you next enter `btp`, the version of the server to which you're now connected and authenticated is shown:

```
CLI server URL: https://cpcli.cf.eu10.hana.ondemand.com (server v2.8.0)
```

Run `btp` again to see the difference; you should now see the version of the server to which you're connected and authenticated, confirmation of your user identification, and also the "current target", being the global account that you specified (via the subdomain) when you logged in. The output should look something like this:

```
SAP BTP command line interface (client v2.8.0)

Usage: btp [OPTIONS] ACTION [GROUP/OBJECT] [PARAMS]

CLI server URL:                    https://cpcli.cf.eu10.hana.ondemand.com (server v2.8.0)
User:                              P0003480944 (sapdeveloper@example.com)
Configuration:                     /home/user/.cache/.btp/config.json

Current target:
  Global account (subdomain: 82715b8dtrial-ga)

Tips:
  For information about the targeting mechanism, use 'btp --help target'.
  To display general help, use 'btp --help'.

OK
```

> The btp CLI also offers a way to [log in through the browser](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/b2a56a8a222940089fd2704a9c26140d.html), with the `--sso` option.


## Understanding targets

Let's dwell on the "target" concept for a moment, it's important. The btp CLI has a [command context](https://help.sap.com/products/BTP/65de2977205c403bbc107264b8eccf4b/720645a3ed3945bd8d97a670b948ac07.html) for calls. At the outset it's only set at the top level, to the global account that you specified when you logged in. All actions that work at a global account level will by default target this global account.

You'll discover that many of the actions you want to perform with the btp CLI will be at the subaccount level - at the level of your trial subaccount, effectively. You can specify a target subaccount too. Let's do this now. Given that our subaccount is "trial" (as we can see from the screenshot earlier), let's try:

```
btp target --subaccount trial
```

We get this:

```
Subaccount 'trial' does not exist in the current global account. Make sure to provide the ID of a subaccount of the current global account.

Tip:
  To find your subaccount ID, use 'btp list accounts/subaccount'.

ERROR
```

Hmm, ok. Well, let's follow the advice we're given:

```
btp list accounts/subaccount
```

> Pause for a second to consider the `ACTION [GROUP/OBJECT]` command structure we saw earlier.

There's our trial account in the list that's produced:

```
subaccounts in global account 906b8d84-2f2c-429d-8ce4-c1bf166aeb08...

subaccount id:                         display name:   subdomain:      region:   beta-enabled:   parent id:                             parent type:     state:   state message:
b8a33bf9-b155-4736-aadf-582dae8fd65a   trial           82715b8dtrial   eu10      true            906b8d84-2f2c-429d-8ce4-c1bf166aeb08   global account   OK       Updated tenant status to ACTIVE


OK
```

It's the ID that's required:

```
btp target --subaccount b8a33bf9-b155-4736-aadf-582dae8fd65a
```

The result is what we need:

```
Targeting subaccount 'b8a33bf9-b155-4736-aadf-582dae8fd65a'. Commands that only work on global account level will be executed in the parent global account.

Current target:
  Global account (subdomain: 82715b8dtrial-ga)
  └─ Subaccount (ID: b8a33bf9-b155-4736-aadf-582dae8fd65a)

Tips:
  To execute a command in the parent global account, use parameter '-ga' without value.
  To execute a command in a different context, specify the subaccount, directory, or global account in the command.

OK
```

This is already more useful for us with our trial accounts on the Business Technology Platform. It's a good setup with which to start.


## Managing configuration

When you connect and authenticate, the details are stored locally, as we noted from staring at the output from our initial invocation of `btp`.

This post and the posts in the rest of this SAP Tech Bytes mini-series is based on running the btp CLI in the App Studio. Certain directories in your dev space's work area are cleaned up when a dev space is stopped and restarted, and one of those directories is the `.cache/` directory in your home directory.

If we look at this in detail (with `ls -la | grep .cache`), it's fairly clear that it's ephemeral - nothing in `/tmp/` is guaranteed to be there on a restart:

```
lrwxrwxrwx  1 root root    20 Sep  7 09:01 .cache -> /tmp/usertemp/.cache
```

But we saw from an earlier informational message that this is where `btp` stores its configuration by default:

```
Configuration:                     /home/user/.cache/.btp/config.json
```


