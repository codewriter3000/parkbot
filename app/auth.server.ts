import { Authenticator } from "remix-auth"
import { DiscordStrategy, SocialsProvider } from "remix-auth-socials"
import { sessionStorage } from "~/session.server"
import invariant from "tiny-invariant"

export let authenticator = new Authenticator(sessionStorage, { sessionKey: '_session' })

invariant(process.env['DISCORD_CLIENT_ID'], 'DISCORD_CLIENT_ID is required')
invariant(process.env['DISCORD_CLIENT_SECRET'], 'DISCORD_CLIENT_SECRET is required')

let address = 'http://localhost:3000'
if (process.env.NODE_ENV === "production") {
  invariant(process.env['FLY_APP_NAME'],'FLY_APP_NAME is required')
  address = `https://${process.env['FLY_APP_NAME']}.fly.dev`
}

authenticator.use(new DiscordStrategy(
  {
    clientID: process.env['DISCORD_CLIENT_ID'],
    clientSecret: process.env['DISCORD_CLIENT_SECRET'],
    callbackURL: `${address}/auth/${SocialsProvider.DISCORD}/callback`,
    scope: ['identify'],
  }, async ({ profile }) => {
    return profile
  }
))
