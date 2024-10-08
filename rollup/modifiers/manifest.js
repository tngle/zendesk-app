const JS_INDENT = 2

export function changeLocation(content, filename) {
  const manifest = JSON.parse(content)

  manifest.location = Object.keys(manifest.location).reduce((acc, key) => {
    const app = manifest.location[key]

    const appLocations = Object.keys(app).reduce((acc, key) => {
      const value = app[key]
      return { ...acc, [key]: { ...value, url: process.env.VITE_ZENDESK_LOCATION } }
    }, {})

    return { ...acc, [key]: appLocations }
  }, {})

  const manifestOutput = {
    _warning: `AUTOMATICALLY GENERATED FROM $/src/${filename} - DO NOT MODIFY THIS FILE DIRECTLY`,
    ...manifest
  }

  return JSON.stringify(manifestOutput, null, JS_INDENT)
}

export function addParameters(content) {
  const manifest = JSON.parse(content)

  manifest.parameters = [
    {
      name: 'apiKey',
      type: 'password',
      secure: true,
      required: true,
      default: "ALWAYS_RETURN_DEMO_DATA"
    }
  ]

  return JSON.stringify(manifest, null, JS_INDENT)
}
