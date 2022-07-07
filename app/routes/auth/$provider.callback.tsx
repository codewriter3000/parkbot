import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/auth.server'

export let loader: LoaderFunction = ({ request, params }) => {
  if (params.provider == null) {
    return redirect('/')
  }
  return authenticator.authenticate(params.provider, request, {
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
}
