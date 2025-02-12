const { type, name } = $arguments;
const compatible_outbound = {
  tag: "COMPATIBLE",
  type: "direct",
};
let compatible;
let config = JSON.parse($files[0]);
let proxies = await produceArtifact({
  name: "测试",
  type: "collection", // /^1$|col/i.test(type) ? 'collection' : 'subscription',
  platform: "sing-box",
  produceType: "internal",
});
config.outbounds.push(...proxies);

config.outbounds.map((i) => {
  if (["其它"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter(
          (p) =>
            !/镇江|徐州|武汉|济南|香港|direct|HongKong|Hong Kong|HK|台湾|Taiwan|TW|日本|东京|Japan|JP|新加坡|Singapore|SG|美国|America|United States|US|韩国|Korea|KR|英国|United Kingdom|UK|GB|德国|Germany|DE/i.test(
              p.tag,
            ),
        )
        .map((p) => p.tag),
    );
  }
  if (["香港"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /香港|HongKong|Hong Kong|HK/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["香港-自动选择"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /香港|HongKong|Hong Kong|HK/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["台湾"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies.filter((p) => /台湾|Taiwan|TW/i.test(p.tag)).map((p) => p.tag),
    );
  }
  if (["日本"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies.filter((p) => /日本|东京|Japan|JP/i.test(p.tag)).map((p) => p.tag),
    );
  }
  if (["日本-自动选择"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies.filter((p) => /日本|东京|Japan|JP/i.test(p.tag)).map((p) => p.tag),
    );
  }
  if (["新加坡"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /新加坡|Singapore|SG/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["新加坡-自动选择"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /新加坡|Singapore|SG/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["韩国"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies.filter((p) => /韩国|Korea|KR/i.test(p.tag)).map((p) => p.tag),
    );
  }
  if (["美国"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /美国|America|United States|US/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["英国"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /英国|UnitedKingdom|United Kingdom|UK|GB/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["德国"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /德国|Germany|DE/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
  if (["中国"].includes(i.tag)) {
    i.outbounds.push(
      ...proxies
        .filter((p) => /徐州|武汉|镇江|济南/i.test(p.tag))
        .map((p) => p.tag),
    );
  }
});

$content = JSON.stringify(config, null, 2);

function getTags(proxies, regex) {
  return (regex ? proxies.filter((p) => regex.test(p.tag)) : proxies).map(
    (p) => p.tag,
  );
}
