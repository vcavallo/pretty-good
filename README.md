# Pretty Good Apps

This is a refactor of my older project, [electron-nostr](https://github.com/wds4/electron-react-boilerplate-nostr), and is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate). 

Pretty Good Apps is a desktop client for linux and mac (likely will also add windows), embedded currently with two apps:
- Curated Lists: an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists)
- a standard nostr client

## Pretty Good Nostr

Basic nostr functionality is currently available. Features include:
- create new profile
- import profile
- edit profile
- manage multiple profiles
- main feed
- following and "firehose" options all available for the main feed
- post new note
- find new users
- look at user profiles
- send / receive direct messages
- manage relays

Forthcoming:
- likes, reposts, and zaps
- fixes to thread view
- probably other basic features

## Curated Lists: decentralized web of trust

This app is an implementation of the [DCoSL](https://github.com/wds4/DCoSL) protocol (decentralized curation of simple lists). I propose that the ability to curate a simple list in a truly decentralized fashion - no tokens or blockchains, no email or phone number verifications - should be considered not only the <i>atomic unit</i> but also the <i>fundamental building block</i> of the decentralized web. If we can curate <i>simple lists</i>, then the ability to curate <i>data structures of arbitrary complexity</i> will very quickly fall into place. See [DCoSL](https://github.com/wds4/DCoSL) for a more in depth discussion.

In this app, anyone can:
- create a new list
- add items to any list
- accept or reject any item on any list
- endorse or reject any user as a trusted curator of a given list

Lists and list items are stored as kind: 9901 (regular events). Endorsements are stored using kind: 39901 (parameterized replaceable events). Your app pulls data from the network, crunches numbers, and shows you which items have been accepted by your web of trust onto any given list.

Curator influence is contextual (list-specific), transitive and calculated in PageRank-like fashion. Influence scores are calculated in a way designed to maximize worthy users while simultaneiusly screening out bad actos (sybil resistance). The app is designed to allow users to look under the hood to see how calculations are performed, and even to adjust various parameters and see how the resulting lists change in real time.

## Install Pretty Good

Clone this repo and install dependencies:

```bash
git clone --depth 1 --branch main https://github.com/wds4/pretty-good.git pretty-good
cd pretty-good
npm install
```

## Development

Start the app in the `dev` environment:

```bash
npm start
```

## Packaging for Production

To package apps for the local platform:

```bash
npm run package
```

The packaged app can now be found in release/app/build.

For more packaging options, including packaging for other platforms and debugging production build with devtools, see [erb packaging options](https://electron-react-boilerplate.js.org/docs/packaging).

## License

GNU Affero General Public License v3.0 © [Pretty Good](https://github.com/wds4/pretty-good)
