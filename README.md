# Anime Todo

![screenshot of anime todo site](https://github.com/rcopeland/anime-todo/blob/main/screenshot.jpeg?raw=true)

## Background

I wanted to try out Redux toolkit. I've tried Redux and found all the
boilerplate cumbersome. I had heard about the concept of a 'slice' and
wanted to try it out.
I thought I'd make some kind of app using a free API to try it out. I
found the AniList Api and decided to make a simple todo list app around it.

## Design

I saw this being a test of RTK, so I decided to put all the state into the global
store, instead of keeping some stuff in local state, like I might do otherwise.
So generally, the components are going to be presentational and the state will live
in the redux store. The components will dispatch events that will update the app
state, then react by rerendering when the state they use changes.

## Implementation

I built out components like normal and then created a global store for the app
state. The AniList Api provides a GraphQL interface, so I decided to use that for
this.
So if I weren't using RTK, I might house the Api interaction inside a custom hook,
maybe it would return something like:

```javascript
const [loading, data, error, request] = useGetAnime();
```

where you would call the request function to kick off the request, the loading var
would flip over to true, then eventually would flip back false and data would have your payload.

But I notice that RTK slices are following this kind of pattern. They have a collection of state
where you can put things like loading and data. They have actions that they supply and respond to,
similar to the request function I would have done.

I also liked the grouping into a slice, by 'feature'. This provides modularity at an organization level
that's intuitive. You can look at a features folder and tell what things are for. I've seen some
gnarly redux powered sites that have an action creators folder packed with generic files that are impossible to
figure out.

The slice concept opens up for adding in more state. The downside of the hooks approach is that you have to either
overload the hook to do more stuff and possibly make it hard to maintain, or you can create more hooks, for example:

```javascript
const [loading, data, error, request] = useUpdateAnimeList();
```

something like that, where you have another hook for updating.

In the slice, you already have system that's set up for holding state, actions and reducers, so adding more stuff is
a natural fit.

Typing the redux stuff is hard and confusing, no change there.

## Testing

// TODO: write up once i've added tests

## Conclusion

// TODO: write up once i'm finished

// TODO: fix type errors / remove ignores
