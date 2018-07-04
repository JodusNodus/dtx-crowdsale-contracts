const TokenSale = artifacts.require('TokenSale')
const { forEachSeries } = require('p-iteration')

async function performMigration(deployer, network, accounts) {
  const DeployedTokenSale = await TokenSale.deployed()

  const DTXBatches = []
  let DTXHoldersWei = {}
  let counter = 1
  Object.keys(Syndicates).forEach(address => {
    if (counter % 50 === 0) {
      DTXBatches.push(DTXHoldersWei)
      DTXHoldersWei = {}
    }
    if (Array.isArray(Syndicates[address])) {
      DTXHoldersWei[address] = 0
      let sum = 0
      Syndicates[address].forEach(amount => {
        sum += amount
      })
      DTXHoldersWei[address] = web3.toWei(sum * 0.1906 * 6000)
    } else {
      DTXHoldersWei[address] = web3.toWei(Syndicates[address] * 0.1906 * 6000)
    }
    DTXHoldersWei[address] = DTXHoldersWei[address]
    counter++
    if (Object.keys(Syndicates).length === counter) {
      DTXBatches.push(DTXHoldersWei)
    }
  })
  await forEachSeries(DTXBatches, async batch => {
    await DeployedTokenSale.handleExternalBuyers(
      Object.keys(batch),
      Object.values(batch),
      new Array(Object.values(batch).length).fill(0),
      new Array(Object.values(batch).length).fill(0)
    )
  })
}

const Syndicates = {
  // Moon
  // '0x1c40c642ead0d9480fda73f3afdae3c05fb2d1b7': 0.1,
  // '0x9c720136aeffc49f74280bc3ad0c131b07794852': 0.2,
  // '0xf0a9abb11958a071e168f2ee5bcbacf1abbde9cf': 0.3,
  // '0x54d77119aedfdd6307fd7b181019b69a0df28167': 0.011,
  // '0xc43ac51a4612f8ea999393ffd9feca9c14c039a9': 0.19,
  // '0xf7ee8dd943871417e74799114e3f169c35c584aa': 0.76,
  // '0x7b05d90aee90582330e7d34fde5da2769f72c0cc': 0.2,
  // '0x84730f080520e389f19ca9ab75f57a87a5ee9372': 0.5,
  // '0xd571c6069ff1f24cd0e4b8f17815114a623bd794': 0.3,
  // '0xf5b9d839ead03fcf1b146a85dcad34619c40a378': 0.1,
  // '0x8f0be6db8d7d2506bb4d9aa141dcd41ba43e7d07': 2.234651603,
  // '0x600e4a0e8fba4c73a7719d82136c05d74ad1a992': 0.45,
  // '0xe0f9c59e775305900366adf582c82a69f34f341e': 2,
  // '0xbc140a75829d9b835c5e95d84940845164522300': 0.2,
  // '0x0cd60cbcfab17e4407b577683b37abcb4d559ba2': 0.58,
  // '0x2c8fb355ce95a317b676842970a4d55d3d26675a': 0.57220854,
  // '0x00d28adcbbd0aed4660ab3fafbf405cf818229f0': 3,
  // '0xa557700b7a2fa668e81baefddd700980753517fc': 0.5,
  // '0x039bbab83ded065d12b74103a961b69b336a30ce': 0.05,
  // '0x5fffca52ddcb371062d911f07cbd4782b3e4e01c': 0.09,
  // '0x34a54f5fdacdfdc154330b99eaaef3b6d54daad1': 0.06,
  // '0x68db53d963af0d9f80b98f12b07c11db9719dc6b': 1,
  // '0xb669678c5559e606ffc19551792186aaba3392d0': 0.02,
  // '0xf0321f4db24bba2ae81117d186f5226c40bad82f': 1,
  // '0xc5c17b400d07f6a36c8b486710d9793d67d9ed1c': 0.135,
  // '0xf2103fc7213db59380419c4c1384584c91e05dc8': 0.1,
  // '0xce9731d91d735c7feebc3dadb44e22e17ae3f56e': 0.25,
  // '0x34a32ad4ba1ea1eb02ccd3ed5b9af9a8d8ea07a8': 0.25,
  // '0xa1ffbccb2e306007d7f801bc90d6000a780c465b': 0.5,
  // '0x9210ac9f805c5aff5459289236ac35835245488e': 1.39417124,
  // '0x429f4e114eb6f6a60fae2080fbbe6af12fbb0d2b': 1.29,
  // '0x4e3a8d8e5f9aa2e32a9962943e1f0b32f0f64f6d': 1.2,
  // '0xfaa12d402e39a9c3441d0a1c5dfcae920b6a7f4b': 0.468759268,
  // '0x24865db55e563cf1b8038aaddb485c652b10eb1a': 0.05,
  // '0x77a50beb54586dd70df7d7c0831514fa3744d79b': 0.1,
  // '0xabdb1f94bff885bd8933ac4f8aaacda4326491de': 1.9,
  // '0x89f41534b2682d7428816b7677ff44b92876c6eb': 0.35,
  // '0xe4a99d3e3a9551f01f96b8881924adc76694f677': 0.2,
  // '0xc4f7c0c5dc62662ca7f728d1ec248bbd07669d9d': 0.1,
  // '0x96e3fcaf6715c9d3e32c5f4ea058a556d9d78c9b': 0.39,
  // '0xa89a900480f305e2ed2735a5f188429433aa57eb': 0.12,
  // '0xb5bab9cfc8c264d9280a99cb51a2c1633658d5ef': 0.5,
  // '0x8f9429ae519f1d38713deccb642ee84b176ebacb': 0.2,
  // '0x19a9a484308797f0422ec88752df30aaf7e152da': 0.13111104,
  // '0x8033127b21f79ed8d1b85774df314282cfd89e8e': 1,
  // '0xccaf158f4fa9e50e27c2aefe019b61948849e0a8': 0.5,
  // '0xe8225a52db749466dce5b26a8a6213ae4122ec35': 0.2,
  // '0xfece6bd275655a8fb0013c3c2c89ff83b9e35af0': 0.2,
  // '0xd6fd665c720bb8d7276f2c0549d68f183f121687': 1,
  // '0x0170ffefd9a0ce87f62da9c87c1e808efa6e872c': 1,
  // '0xd2f2c73731ac300c4a357bd5e5713f5f9222633c': 0.25,
  // '0x5fa8af65f42672802e744b87f4a32e1a2175368c': 0.151,
  // '0x317104afb3a12a2d8279e2f49ce634fa2c8bad6b': 0.55,
  // '0xbb6792b5b88c9959ae4e1b4161a8111b5955f29b': 3,
  // '0x55e85983ab8e2252a76ae3ee3a611fa31e36f771': 1,
  // '0x2263d7dd11502eb06c839c30c231401c743c0120': 0.5,
  // '0xc0b96547f2c2992dafecc5bdfa43dcee89c39b4d': 5,
  // '0x4a5fc01af42e69c73fd55087a1f75cb6414be8f9': 1.131,
  // '0xa8d1be5678d689076eeb03a5e0088c86aae7849a': 0.3,
  // '0x4cf3bd89284e6a1c561a96c2c98780b0883ebb14': 0.2,
  // '0xb618e449e45b550d4535c2fd726f4402efafdeea': 0.1,
  // '0x843befe01901a0454ea5ae2e0bde5598f0b50de8': 0.247,
  // '0xaf475279d98e446621b434f31cd960dc15356dbf': 0.15,
  // '0x76c3c2306fa1017b32b1a039562e47820e57e956': 0.2,
  // '0x21c53f0ac773145dbb25b556a5d4be9f05ce6b89': 0.110615618,
  // '0xdc9f7e7c2795247f8cca71cb697247e649d589e9': 0.35,
  // '0xf3aff3bc1ed9257e0aad2699533b1b5859079943': 0.5,
  // '0xa9c25518a0fa7c9f94e03d75160e869d7ac8a7d6': 0.33,
  // '0x82288e232ae3784d7cdd836750efa918fac4003c': 1,
  // '0x806dee2905afdfd684eababd08032843546f7b07': 0.56,
  // '0x24860d25226ce54aeff4537d8abafd94a9e65197': 0.4704666,
  // '0x1a2f02612769e961522fc84a51bf72ade491ba87': 0.04,
  // '0xfecc90fd572b811a2117936e759e468e38b53562': 0.05,
  // '0x4ea982e5d86ce9b9c8c6529106afc69cfc1b6af7': 0.2,
  // '0x96ef683b12d7a45b5e33f558b6d05020e1ba6353': 0.4,
  // '0x87bf1e465097bba8ebfae4a2aedb15872d96efb5': 1.268,
  // '0x04e859817aa81e111b34f39d26576d90b5bcac3e': 0.25,
  // '0x7bac17cb13884639cc178e25b73cf13df55e8713': 1.1,
  // '0xd8d1e4467a06c0fd9ecd0bf7d1fcb0429d0a8465': 0.32,
  // '0x6390054116971a3cbf2ab200cdc94bccca39fbe4': 1,
  // '0x0f27b6f0e4450f6c563b81da1a4b86b17a2bb5be': 1,
  // '0xadc58cc72329d85c5d4388d5da9c7b1e428c1924': 0.3,
  // '0xd289cf22460b0b354b3e674c1e857e6e25c2599a': 0.1,
  // '0x1a409d92f6fac3b8820cd84ff4f85555f9081f42': 0.5,
  // '0xa3a5e7e17f390493c4a4934422afcd795684c2f7': 1,
  // '0x580532da397a12639919fb1a7879593638072bc6': 1,
  // '0x76dd89ab9892b099bc6f1f03f06b0e4aa213ba04': 3,
  // '0x83f82b46651ffe97dbcf122402b93b8327ed87e3': 1.36,
  // '0x9f84e18e24affdbf7bdec4ab50151351b4aed883': 0.333559,
  // '0xDE25438009aFcc60FEDcb052AB3DcC20764Fb85b': 1.5, // fixed
  // '0xf7b10d603907658f690da534e9b7dbc4dab3e2d6': 1,
  // '0xb38e378c44c76d6fa7942b694d61a34774b6bdee': 1.928,
  // '0x95a7bef91a5512d954c721ccbd6fc5402667fade': 1.18,
  // '0x7e6e1a32e33f7cc4222cf6c192f44f4a537e1940': 0.1,
  // '0xee03c4788efe6126e580e13a0f571017acd27cc7': 0.5,
  // '0xbe5c79e78eff5e0b35fb6383258bc83cadc8511e': 1,
  // '0x4d6630d5b6976f6a9762b9b5aee6af28c97bb77d': 1.597,
  // '0x33fc2b3c7673d9f47c2956f2196580ebb8a982c6': 0.21288818,
  // '0xdb69194b706b2508462d1bd8867ecddbd4a574c3': 0.2,
  '0xed27d93d2cc754ef1dab2da1e734180f086dbac4': 0.5,
  '0xd0f92f2201d4d90ff8f6c813a2b2229848c97011': 0.6,
  '0x4b6091ac7ee144ca2229273fdaf7c72cca251c15': 0.049139,
  '0x39ba371ef5a97cfec6d74fb19946ca6084360547': 0.298,
  '0x1a3d97ecc5a9a0e475666c88910d5d5e9921f464': 0.02,
  '0x79e7462f26556a48221e87b623cb3cc058a48b64': 0.1,
  '0x978d7d1da3c81f272bd8ee80ab4886b012613ef1': 0.25,
  '0x7aa4e583626d0b4d5393132f4cf991ec8ff6f526': 0.3,
  '0x9ebf84e92e4f9378058329e73510665bff458223': 0.1,
  '0xf36fba9c04f14e2893c8b58fb2a7d7ec5111b73d': 10.1,
  '0x59ef7e741c731162ebd79db315491fa79a880adc': 0.999139,
  '0x3ecf5b0153cfd64e7709b627dbc05420159ba09e': 1.56,
  '0x9bac55140d2b922d191842a7d34c3dfbd665ce4e': 1.014189, // fixed
  '0xc2feac2c1409249ad24298e2cdb1186fd31ac9e1': 0.5,
  '0xfdb1d7e43fd8e50bd0797f511fcdc5853b34bb19': 0.5,
  '0x12938df2a7f71d105f28324714e920fdb2398bc2': 0.054,
  '0x01895e5c6a697ce47e5341f2a9d8240c64e22e1c': 0.54,
  '0x306c32be41e48d1f77ec398ed31f0cbe145c332a': 0.5,
  '0x6361440ae4b1b55b5c5de91026ad6c08b91a820d': 0.012345,
  '0x721fbe8fb7c196cb93eaaf086c0d78a48fbb6e5f': 1,
  '0xcE1061f54D18F080cDB7260ad67DfD3Ecba2D7Ad': 0.99, // fixed
  '0x6819e97819b721a91b9c236378ca66296fe2346b': 0.19,
  '0xe82263e0ceb48d02f5b3a2feeabaebd11a04b54c': 0.055,
  '0x577e532a7c1bbf9460820ce2d3c10fef835f1e54': 1,
  '0x861a533a48b6792051d7b13fc44ccbf10f5f52c0': 1.2,
  '0xc5276c051029d17ddbcdd15b47d25c0d020b81b2': 1,
  '0xca7321e1bc14dd45ed058c146c037643d4bf5762': 1,
  '0x6b404dca2a176b98d0c57e8857a902f77251cf5b': 1,
  '0x80ffd2ebde92c0b29658c454d2b84111b8c10f5c': 1,
  '0x2048c1e4fe34ad15a5cafef5df2f081d28152567': 0.25,
  '0x8b18824aa942bd4cd8410c561fa4d05b6a0a5f4a': 0.1,
  '0x3cf90af435ecb5be8c6c4ce7d7d5f75f89858fee': 0.5,
  '0x33d45e62ea5a3ea986f0823f5b75f24c3d16982d': 0.91,
  '0x5276b6e03713fc3d4ea0b650c7acf1fe6f9c7386': 1.5,
  '0x6e9e27976f1dcd5499fdd08b4296e37ccc63d358': 0.3,
  '0x5e94d09d9fcc0c0720d447e01c82ec30dc3e4189': 0.41701214,
  '0x90ca05c876f48a9ca51fe0e81e3181c91a3ae260': 0.12,
  '0x1ca5a38809f0a1a84c4f841e56233d42207cb94b': 0.5,
  '0xf32c5251c0a86c845b2eb21cc0ef5e84fec1d639': 1.2,
  '0x6a07258e0f366201e6b8105b8cc4314e2202f906': 1,
  '0xe0bf92fe5e6517891ff2ea48256a2280c13de869': 0.57705927,
  '0xc3f004c60d3eac3a3158d068c60799aaab91c43e': 1,
  '0xf421c40743589887aef483028a80f28f2ff1575b': 0.2468,
  '0x1b947ac76da5be7e0ed8bf65f643a18df97e776a': 0.0600615,
  '0xd8405bc4743fa48e7939804751d43c7ddc61a840': 1,
  '0x5497ea66ad0d75559b96e59cc4fb23336ca62c21': 0.03514459,
  '0xaf1f56b518d906c95633145d102cde44ea3d8084': 0.1681,
  '0xe3190db7c75a7fa91d71df7fbf4e48e00201025c': 12,
  '0xd8791bce2732e988292fa591a47096d35257b817': 0.34075758,
  '0x448765398e456059e851bc0348bea522eff22799': 0.5,
  '0x192f84444c241c189cd33dbd55d7cf4d878f630e': 0.6,
  '0x090acd31bb9e59d816c568e8322f8f87cf885125': 2.5,
  '0xa1e3b060bab283bdff0c86ce44c1c0f2bac8950a': 0.2,
  '0x99f8fd58afba41f58b5cac279ce282fde5012bcc': 5,
  '0x2d86719e4f875d4898be05f4f85e0e70d3a05974': 2,
  '0x1f217ac280a71f68a7c7b7b4aee8bc99cafade5f': 0.4,
  '0x219ebb35df02909056aec51473eed49a08fbdbca': 0.3,
  '0xc09db81cfd9fcf94894bbe7ddb8ed186f98a6ed8': 0.1,
  '0xa7f7ab6c3f2d2eacf6c6f2da0aa5f0d519b11e00': 1,
  '0xbda26558e81dc9cca0643680dccbf3422939322a': 0.5,
  '0x91c93bdf952a37190969a093838ec6ec8d7504dd': 1,
  '0x7c6b2ad70a65c14820e7a4ff70bf9120a7d41a8f': 0.2013287342808,
  '0x4a0d97a25f793270d497b4698c17b0c95e98200c': 0.0275675675675676,
  '0xef26768affccebfc876735235c0e4b17c08a665b': 1.13139903,
  '0xd93a7c469a417e11db425ec7a2a29fe34a73d9a2': 0.051,
  '0x44f3871d7e696799b23db51800be8122a095da96': 1.123,
  '0x3375620281d5c785440036bf2b463642113588c8': 0.25,
  '0x0537f684692161b16e6a45c7997612e820e496d2': 0.11,
  '0x60cd2853fae4cec9967c8c91df72a2aaa0a09faa': 0.016195845864411673,
  '0x60e95ae9c9462df5227b619bc32e586c2348088d': 0.55,
  '0x1a182a091a3e865fc4902b200bc740476a284eb5': 10,
  '0x83c519ffb6899ed7ad4ba5088b44c382b634e14d': 0.5,
  '0x88612c399f2ac2bfc7aec2d15afcc6e35dc79788': 0.44061,
  '0xd9008a25cc8916fea0b1efc4af5b29632fa5fee2': 2.5 + 2,
  '0xce47f622cfbc3bd1957676c552577f28d016b5c7': 1 + 0.5,
  '0xa66775b93c654905a9441250936b63749d5b2b92': 0.3 + 0.2,
  '0xed1154145b6e2094adf9cf6253042b98dc849ad6': 0.15 + 0.17,
  '0xfc05056fbe5f4ddd029dc1f674239ffa7a85363e': 2 + 1,
  '0xc09d26133d85d13683222d1dd980b1ea2916b1d1': 1.75 + 1.25,
  '0x7e8b35de17c597167d750cce6ca64909d0c4be40': 0.016 + 0.016,
  '0xb3801fb591b238d88eeb6f387d24d723b4ab4ef3': 1.00356017 + 1.01,
  '0xe615dcd379c06db6a3b8e49b6c01b6489ba1696d': 5 + 100,
  '0x20c0361c168dd90ac92ac0130f520f413698e10e': 0.934139 + 0.889139,
  '0xd1b1f131f80575374ddc1c04ff2ea39492002a4a': 0.01 + 0.01,
  '0x6eb6c332c5603550a8088e523703df7ae2135749': 1 + 1,
  '0x0e1c14f5422fb41b1c2ed0398dc2a9da9952723c': 1 + 1,
  '0xec46213dad2b333d9eeba2f71c93d7810065cd51': 0.3 + 0.3,
  '0xfa23ddb8e41ca1201612436900922855a8ced9ed': 3.90234645 + 7.08958,
  '0x25a27949ddd9fa1d298873e72f6fe86b82e7fdf5': 0.1,
  '0x02621891933e8daf0e916286553cd6bbf48f5af0': 3,
  // Matt
  '0x4863e29c95625621e98d2b2313c082070ed1230b': 0.12,
  '0x73d77abde7746150dcc4a95b23fede1c5b4e0391': 2,
  '0xf3653614bdfab22c94d57251ac83bd752b2b9429': 0.19458,
  '0x71399eb96c0f0fd283bd09f0e39ced02aadfa912': 0.4652772,
  '0x2ef8197440dde7bab1723d6a8495fc9d2d396374': 0.2505,
  '0xbef11ec4a2b4cb2a1d97de2812c2c524d14b31e2': 133,
  '0xCC5897aD892360306a98b7BF528d677269d5830C': 6.80151786,
  // last call
  '0x303389a6ba8410bee19e71f014c49c56de971f2f': 39.01,
  '0x017165b5fa5d3f3560ee1d6da619bb1ca5fafd46': 25,
  // priv
  '0x76fd046bbd7e2363a971cc1e752361d6136da01e': 50,
  '0x639cec09a3aD0DEDC2951ADB00C43a43160273c3': 150,
  // cc
  '0x325424b6dd000e1d07edb646f235a34293fbf2e6': 48.2,
  '0x2fa9e3da421962ee6f66de60e66cc0cafb37c721': 12.81,
  '0x5d48992bc182729fe696348765d7f7ce8960cb62': 14 + 1,
  '0xcdac62b896892037c42feb88159b549e590558ba': 6.8,
  '0x7f1f5ec3d5211a0225d49309ef729e86fd07b0be': 5.065,
  '0x8b34afd3d33cf3affadaffc3fb6040f5a6d8cf94': 13.7787335,
  '0x4cc59ca353bc69ea83035b095292c24d613ebea9': 20,
  '0xf7af86e58b6cf65c16cd6a909c547a8d2db6bda7': 1.499139 + 0.999139,
  '0xc5b4e3ed8b30bf691bfda2d1604080a6781d0fc3': 35,
  '0x8c38e5c7b14744cc6d451d6aedc5a8acba2db907': 51.2,
  '0x974ee08ed54a775a07771554fe73710b00ab4a9e': 20,
  '0x480c5b3fcbb5d20550cf66b4446549a32958c1cc': 6.35 + 5.7,
  '0x09e22868c6843e7f1fc163c8634f30fe9d39cd7b': 10.4,
  '0x39ecbabcf8a9d35b11040f45d602828c11b671f4': 10 + 22,
  '0x647fbf4c03f487ac1132bfa6f40a401d34bd2234': 2,
  '0x805c120e9836e623b83dc5938c62f95ffc5fce70': 16.86,
  '0x8798a672b25fa60d9c2a3a14b3a5a7a2210b0d90': 10,
  '0xe3e92de31c9d4c39217d6050cec4ce012bf9c936': 3.721762551,
  '0x827a88c8c372903e3a692d86734a325a213dddb9': 11.10732091,
}

module.exports = function(deployer, network, accounts) {
  deployer
    .then(function() {
      //return performMigration(deployer, network, accounts)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}