_Get the btp CLI to help you with command autocompletion._

This is a follow-on post from the previous one: [SAP Tech Bytes: btp CLI - configuration](https://blogs.sap.com/2021/09/XX/sap-tech-bytes-btp-cli-configuration/) and starts where we left off there, with you logged in.

## Actions, groups, objects and the command structure

There are many different types of resources that you might want to manage on the SAP Business Technology Platform (BTP). Moreover, there are different actions that you might want to take on each. This is why the command structure that the btp CLI supports is how it is:

```
Usage: btp [OPTIONS] ACTION [GROUP/OBJECT] [PARAMS]
```

The BTP resources are the OBJECTs and these are organised into different GROUPs. You perform ACTIONs on these, possibly supplying relevant information via PARAMS. There are also general [OPTIONS](https://help.sap.com/viewer/DRAFT/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/11d9f67d2c68485ca2f435b955d3b85b.html) that are not ACTION or GROUP/OBJECT specific.

Here's a shortened excerpt from the output shown when invoking the `--help` option, i.e. `btp --help`:

```
Actions for accounts/available-environment
  list                  Get all available environments for a subaccount
  get                   Get details about an available environment for a subaccount

Actions for accounts/directory
  get                   Get details about a directory and its contents
  create                Create a directory
  update                Update a directory
  delete                Delete a directory
  enable                Change the set of enabled features for a directory

Actions for accounts/subaccount
  list                  List all subaccounts in a global account
  get                   Get details about a subaccount
  create                Create a subaccount
  update                Update a subaccount
  delete                Delete a subaccount
  move                  Move a subaccount
  subscribe             Subscribe to an application from a subaccount
  unsubscribe           Unsubscribe an application from a subaccount

Actions for security/app
  list                  List all apps
  get                   Get details about a specific app

...
```

The relationship between ACTION (`get`, `list`, `update`, etc) and GROUP/OBJECT (`accounts/directory`, `security/app`, etc) can be seen quite nicely here.

## Enabling autocomplete

With the btp CLI you can perform different actions on a wide range of objects, so much so that it can be a little overwhelming at first. This is where autocompletion comes in. You can use the Tab key to ask `btp` to make suggestions, based on what you've typed in so far (which could be nothing at all).

As well as the main actions, there are some general actions too - you've used a couple already: `login` and `target`. [Turning on autocompletion](https://help.sap.com/viewer/DRAFT/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/46355fab22814944bedf449a6c953369.html) is achieved with another of these general actions.

Do it now:

```bash
btp enable autocomplete bash
```

> The btp CLI supports autocompletion for different shells: Bash, Zsh and PowerShell. The shell you're running in your SAP Business Application Studio dev space is Bash; this is why you need to specify `bash` as a parameter.

Here's what happens:

```
This will install the autocomplete plugin script for bash
to /home/user/.config/btp/autocomplete/scripts.
Do you want to continue? [no]>yes
Which RCFile should be used for the installation?
1: /home/user/.bash_profile
2: /home/user/.bashrc
3: /home/user/.profile
4: Custom
Enter option>2
Autocomplete script for bash has been installed
to /home/user/.config/btp/autocomplete/scripts.
You must start a new terminal session to activate the installed script.

Tips:
  Use the TAB key to complete commands and provide valid command actions, options, and parameters.
  Use the TAB key to cycle through the suggestion lists and the ENTER key to select.

OK
```

There are a few things worthy of note here:

* the autocomplete mechanism is installed into a subdirectory `autocomplete/` within the configuration directory we specified for the btp CLI; this keeps everything nicely together
* I chose option 2, i.e. `/home/user/.bashrc` as that is the file we've been using to maintain and customise our shell environment
* There are useful tips at the end of the output on how to use the autocomplete feature

> Have you ever wondered why the `.bashrc` file name ends in `rc` and what it means? Did you spot the reference to `RCFile` in the output? Let me know in the comments.

The installed autocomplete mechanism in `.config/btp/autocomplete/` needs to be activated when the shell session starts; if you look into your `.bashrc` file now, you'll see a new line has been appended, right after the two we recently added. The line looks like this (with some whitespace added for readability):

```bash
SAP_BTP_CLI_AUTOCOMPLETE="/home/user/.config/btp/autocomplete/scripts/sapbtpcli-autocomplete.plugin.sh" \
  && source $SAP_BTP_CLI_AUTOCOMPLETE \
  && bind 'set show-all-if-ambiguous on' \
  && bind 'set show-mode-in-prompt on'
```

This just sets another btp CLI related environment variable pointing to the autocomplete script, runs that script, and sets a couple of [`readline` options](https://www.gnu.org/software/bash/manual/html_node/Readline-Init-File-Syntax.html):

* `show-all-if-ambiguous` will list possible matches immediately
* `show-mode-in-prompt` adds a little indicator to the prompt to show the editing mode (we'll see this shortly)

> `readline` is Bash's command-line editing interface.

As instructed, start a new terminal session to have the `.bashrc` re-sourced, and you're ready. Note that the shell prompt now has an @ symbol at the front:

```
@user: user $
```

This is the result of turning on `show-mode-in-prompt`; personally, I don't like this so I remove that last `bind` statement from my `.bashrc`. You can do the same, or leave it as it is.

## Enjoying the comfort of autocomplete

Now you're ready to try the autocomplete features out. First, enter `btp ` (including a space, so that the shell won't try to autocomplete the "btp" command itself), and then hit the Tab key; you should see something like this:

```
@user: user $ btp <tab>
add          enable       register     unassign     update
assign       get          remove       unregister
create       list         share        unshare
delete       move         subscribe    unsubscribe
```

You'll recognise these as all of the possible actions that `btp` understands.

Next, continue with `l <tab>`:

```
@user: user $ btp l<tab>
```

which should then autocomplete to `list` and hit `<tab>` once more, and you should see the objects, by group, which can be listed:

```
@user: user $ btp list
accounts/assigned-entitlements  security/role
accounts/available-environment  security/role-collection
accounts/available-region       security/user
accounts/custom-property        services/binding
accounts/entitlement            services/broker
accounts/environment-instance   services/instance
accounts/resource-provider      services/offering
accounts/subaccount             services/plan
accounts/subscription           services/platform
security/app
```

> Note that you haven't pressed Enter yet, at all.

Nice! Let's say we want to list the entitlements for our trial subaccount (remember, this is already pre-selected via our use of `target` in [SAP Tech Bytes: btp CLI - logging in](https://blogs.sap.com/2021/09/07/sap-tech-bytes-btp-cli-logging-in/)). So continue on the same line with `a<tab>e<tab>` which will narrow things down to the `accounts` group and the objects beginning with `e`:

```
@user: user $ btp list
accounts/entitlement           accounts/environment-instance
```

Close in on your target by adding a final `t` (note that the autocomplete has autocompleted as far as it can by adding an `n`) to disambiguate `entitlement` from `environment-instance`, and then hit `<tab>` one more time to autocomplete to what we're looking for:

```
@user: user $ btp list accounts/entitlement

Showing entitlements for subaccount b8a33bf9-b155-4736-aadf-582dae8fd65a:

service name                         service plan       quota
customer-order-sourcing-app-trial    dev                1
saas-registry                        application        1
APPLICATION_RUNTIME                  MEMORY             4
alm-ts                               lite               1
sapappstudiotrial                    trial              1
business-rules                       lite               1
transport                            standard           1
personal-data-manager-service        standard           1
portal                               standard           100
...
```

Now that's what I call working in comfort! Here it is in action:

![btp CLI autocomplete in action](images/autocomplete.gif)

The best thing to do here is to simply try the autocomplete feature out for yourself - it's easiest to learn about it by doing. And that's it for this post!

In the next post, we take a look at output, and alternative formats.

---

![](https://blogs.sap.com/wp-content/uploads/2021/02/screenshot-2021-02-22-at-11.00.25.png)


SAP Tech Bytes is an initiative to bring you bite-sized information on all manner of topics, in [video](https://www.youtube.com/playlist?list=PL6RpkC85SLQC3HBShmlMaPu_nL--4f20z) and [written](https://blogs.sap.com/tag/sap-tech-bytes/) format. Enjoy!
