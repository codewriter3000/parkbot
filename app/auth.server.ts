import { Authenticator } from "remix-auth"
import { DiscordStrategy, SocialsProvider } from "remix-auth-socials"
import { sessionStorage } from "~/session.server"

export let authenticator = new Authenticator(sessionStorage, { sessionKey: '_session' })

authenticator.use(new DiscordStrategy(
  {
    clientID: '994414124622680104',
    clientSecret: 'OhEWbDEoJ_ObB7JONYs2uII28z183hi4',
    callbackURL: `http://localhost:3000/auth/${SocialsProvider.DISCORD}/callback`,
    scope: ['identify'],
  }, async ({ profile }) => {
    console.log(profile)
    return profile
  }
))
