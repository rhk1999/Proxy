  const yaml = ProxyUtils.yaml.safeLoad($content ?? $files[0])
  let clashMetaProxies = await produceArtifact({
    type: 'collection',
    name: '机场',
    platform: 'ClashMeta',
    produceType: 'internal'
  })
  
  
  yaml.proxies.unshift(...clashMetaProxies)
  $content = ProxyUtils.yaml.dump(yaml)
  