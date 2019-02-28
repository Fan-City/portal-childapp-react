import {SERVICEID} from './config.js'
import React from 'react'
import ReactDOM from 'react-dom'
import elrondSpaReact from './lib/elrond-spa-react'
import Service from './service.component.js'

const reactLifecycles = elrondSpaReact({
  React,
  ReactDOM,
  rootComponent: Service,
  domElementGetter
})

export function bootstrap (props) {
  return reactLifecycles.bootstrap(props)
}

export function mount (props) {
  return reactLifecycles.mount(props)
}

export function unmount (props) {
  return reactLifecycles.unmount(props)
}

function domElementGetter () {
  let el = document.getElementById(SERVICEID)
  return el
}
