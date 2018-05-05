const TokenSale = artifacts.require('TokenSale')
const { forEachSeries } = require('p-iteration')

async function performMigration(deployer, network, accounts) {
  // if (network !== 'development') {
  const DeployedTokenSale = await TokenSale.deployed()
  const DATABatches = []
  let DATAHoldersWei = {}
  let counter = 1
  Object.keys(DATAHolders).forEach(address => {
    if (counter % 50 === 0) {
      DATABatches.push(DATAHoldersWei)
      DATAHoldersWei = {}
    }
    DATAHoldersWei[address] = web3.toWei(DATAHolders[address])
    counter++
    if (Object.keys(DATAHolders).length === counter) {
      DATABatches.push(DATAHoldersWei)
    }
  })
  await forEachSeries(DATABatches, async batch => {
    await DeployedTokenSale.handleEarlySaleBuyers(
      Object.keys(batch),
      Object.values(batch)
    )
  })
}

const DATAHolders = {
  '0xecf8db4968a8817e21bdd5ecda830e413089b534': 1466.66666666667,
  '0xef58321032cf693fa7e39f31e45cbc32f2092cb3': 200,
  '0x8eaae9a87a46771f1d2b3322d0ad26505ee2821a': 100.95,
  '0x1b984fc7f01a034e32c5b7bb96ff2f2648618d06': 99.98,
  '0x8eeabde86f418c5192121a9a865d73477744fc27': 69.8672541477581,
  '0x970b13bc519e0c2b26395db370aa92d270f419e7': 50,
  '0x2a90f141caf619448488c251327b3aa526d0066f': 35,
  '0x8accb7194c89d52019b0659ddd1b0f634de594ff': 30.1375336867096,
  '0xee46b619f71bd4e06a079f495261bfda13c3ac2e': 24,
  '0xb804fe56924c104545b23cd463460715a24cd41b': 20,
  '0x86908b787a68ed8a5b7717209f0519b8bb338877': 20,
  '0xd8b768d4203745010de822b86c72300944040716': 15.75,
  '0x165cd50013a1254cae430b2a35ddb768ac33a425': 12.97,
  '0x65d9b4c5af26593f16327f0c9734c21cf49ab0a5': 11.49,
  '0x9640ab5d9db35ed447fdfdf52e68c525964c5f56': 11.025,
  '0x222261ec524d3e1f8fe596cded921c523b2ae8f9': 10,
  '0x50bc9e0cc33bdc262cc1b5f8aeb4d5c5d3bc6a02': 10,
  '0x62b304439c1a2d51e9346b87fdc567f1befe8bbc': 10,
  '0x3f1224fe9fbb364564d291df1fb1f8f204e79f19': 7.986,
  '0x16d0af500dbea4f7c934ee97ed8ebf190d648de1': 7.5,
  '0x4d4ed159d921feb181746725b79cdd3339f328be': 6.53213232999998,
  '0xabb0bd1360234c633d2589df384e4cab0272ba17': 6,
  '0x6f3dfdefd463889796e863e9f14bf984fcf98e74': 5.2,
  '0xe36a8ec5e7a236a870608ab26b938835cba8d152': 5.1,
  '0x37235352feb52fa454400abfe3905bc42204104d': 5,
  '0xf2ba61c198cdc5a65ba484602231143f17d28489': 5,
  '0xc350d1ecc1c71e41612be8c6c690f8af4dda32e6': 5,
  '0x1514c7018e9c82f9020cc0fcabd7d0625af2237b': 5,
  '0x946b1e43340fe1f736651e160fb69b477460962c': 5,
  '0x92083c544b9510bf61bf04efc3b509d8d4c7d1bf': 5,
  '0x0de54fd27817f2467f35b7a6b6b9b76db07932ea': 4.3995,
  '0xbc459e8bd0b41814f10744fe9932da7a85d14e66': 4.3958,
  '0xbb5cd807a0474ccc5af2922728de8f3b8aa7813e': 4.08,
  '0xb1f3248690befd279b9ca137f8603deca444558b': 4,
  '0x9285742ad8a9266d770035ea70d75f11824b0786': 4,
  '0xca4ad3d429ea5130512b0ebb7fa4a7fa6d1a0e41': 4,
  '0xadf6bc368a04aa53555d00cab95c75bd8a52dc42': 4,
  '0x249bb242a23cd12c396020dc6ec5217b88068ad5': 3.9748,
  '0x382cd1ff0d43985a821c790d3f54cd22f86fe835': 3.7037037,
  '0x1f17a2a6726988b4fc1b13d0bdadd469ba9ca5b0': 3.57,
  '0x9e4a2b774dc68c997c8b8cb30f8c8d5540dd4fe0': 3.3,
  '0xb24835d833392351ef03822daf5af3daa5bc23a4': 3.27,
  '0x15dbf5647c1480a6796fd8616beb0e2e6b848bb1': 3.156,
  '0xdc954129e5e3a4354bf6ec985e889eed04f3c293': 3.039,
  '0x59cb9e21adfacf203f27f787ca3755d685e3287f': 3,
  '0x75750d0bba74ecb961fa588873a0ef69c54361c1': 3,
  '0xcb1e36ed431619636ffb357f35f348af9088d096': 3,
  '0x3833f8dbdbd6bdcb6a883ff209b869148965b364': 3,
  '0xe3cdc546850c78c9c8d5a6b1023c86fd86a27f9e': 3,
  '0x21f78f131618970181d2ebe3b7f08a82bc11315c': 2.9,
  '0x41e9935d98ca8b1e110a27064fa56bc13a555321': 2.846,
  '0x1aae8b219dcebf6316764c95890fa961939f86cb': 2.52,
  '0x214f07ac149420259bca6325ce4181d9b59d4fd5': 2.5,
  '0x540dabc00b0781fe28928cd344f57229ca1cf867': 2.5,
  '0x1b9582c1348076b1a0c8e378ac02ded0c4fcb251': 2.48387922,
  '0xbd47cd0bbafe633e21ba3b5aa8a5d21dcf41f837': 2.3062,
  '0xc466c031d9d3a92bd4067845719b81ec1ebd63a7': 2.15,
  '0xb06537e432ebe0718231dfa3c34800524b1402ca': 2.0895,
  '0xa2ff4dc6e5ad4fe484080e9ab8bb5fd85900327c': 2.009,
  '0xc44e607c7c8901b8a423ab375e9974c3bac4a61b': 2,
  '0x2f7fd2e4a6364107fa0d04feab5b05b56d35d34e': 2,
  '0x2ed37a6692af9b011e3b7586527f7a4a16c45a10': 2,
  '0x8cd3bec93d81f900f4faef7f40259d392b616a7e': 2,
  '0x745ec4572e2e58ab2790549764dafc4171585597': 2,
  '0x73274c046ae899b9e92eaaa1b145f0b5f497dd9a': 2,
  '0xd682bc600f396232e927a01474756f78dcde35c8': 1.9808,
  '0x2be830c9c4a3eb3f9ebf736eed948e9ec1f1f33b': 1.95,
  '0x441796ba89dc57bed0bce21dd46ce60fb32e6f6a': 1.7,
  '0x525cfc07f5e47a100d157a29b7250590f8d258ea': 1.6,
  '0x7070dfa7bc632d5b268ab3639f80273fd320180c': 1.509,
  '0xdbd51cdf2c3bfacdff106221de2e19ad6d420414': 1.5,
  '0x932383ef41aa7eb3be7f6ede1bc6b685a3a11774': 1.3165,
  '0x59ff6c4543b800277b8a2563842e3838adf69649': 1.2,
  '0x6e282aefd002a96d52f72e85a95b2319386501a6': 1.1,
  '0xf532dbdea711e843e0a4004a9dd9754da3dd7891': 1.073,
  '0x174ec6c8dfc2324152772dd0cd68fcfbd1f3c515': 1.06,
  '0xb911ecf41a3868c983d04fc69e56c696fba5d886': 1.05,
  '0xc14c3a5fdca3a4b177c42f02039c9e60d1b84254': 1.05,
  '0x6db669a0666ee5837fc1752cb0e729bfc5875902': 1.03,
  '0x1e473fc6c4fe2c8c2f8a96583338c35735357a7e': 1.03,
  '0x81ff6862de78ef1461f58ca8747438e585a73e00': 1.01964761,
  '0x82b3b3fffd8680967305debf1816fe49b090670d': 1,
  '0x3436901999adf64c284e1de7e01dd0b33fe4bc2d': 1,
  '0xddc94bc4f885d9565a0ba6d3e0eb197049e116c5': 1,
  '0x96aa3553d2a5906f3bed73d593a38721663747c0': 1,
  '0xf25fae6d5b099e54f458209234e132901fc0865c': 1,
  '0xde499368b1bb96bb39c10dd809307c6a0dc38d95': 1,
  '0xe5f1cca2a318a236100044f8bc0d8b997aa05f00': 1,
  '0xaa54ab9cfbead9b2b1b88aa2af89373f3e53367c': 1,
  '0x9198f14e0eb5919160c1391ea9e7d214be70dbed': 1,
  '0x043fefe033a01db9b726bcfe2e220f8c44baa52d': 1,
  '0xb76c2782f8ca63a7df8e98bd6575ddb2364f4183': 1,
  '0xa3c29ffa3a2e7b1b5ffcf53dabb0991025b73d30': 1,
  '0xab3555fa3da142a9d2a969ace012d4ff889c41d6': 1,
  '0x71ecf7846347376c3568ae1e51d1dced53b273b1': 1,
  '0xf17be13b34080551c74687d4509606efa6f6ec77': 1,
  '0x6e188af62443f78fc348724073f666ce34e06fac': 0.999860014,
  '0xd53a06d41f340d9e826115721b222e5f93684852': 0.9943,
  '0x539baa0272479276dca2229fb4f6cdd6deaf1ba3': 0.9937,
  '0x919accba58362a82299bcf6defb6afca1e7f240a': 0.992060294,
  '0xc6c1e64a24d9651273a5f6eee73136a6649bcc61': 0.99,
  '0xf30ce01fd8c5dfc7ff56139cd75066bd910a73e6': 0.99,
  '0xfc451fc713435cd4d4892350e1517a4b2695e03b': 0.982993315,
  '0x28bfae88c821e8056a7c467f5b2c13e4235e6849': 0.94,
  '0xcdfa4816e245e94adff35f490cbfe3215cf7acaa': 0.92935842958,
  '0x7a049cdf3b792dbe60dbbf578832e74e1607a3f2': 0.9235,
  '0x550f6d5d0b094a21a1c93b568424dfa321d11e53': 0.9,
  '0x6b7c2739be549d3743c0d9e9d423bdf5a6db749b': 0.9,
  '0x73d18db6e332b64e0247b3f6fa081152d3d2b259': 0.84,
  '0xaf308156c2a172747592111dd4c01fd1c739d9ab': 0.84,
  '0x07cb8a5a9af81dac2956b0ce3a0c7ded359f4a7f': 0.8,
  '0x34238cef87af6ac2634a729d7af6bbdaae695022': 0.785,
  '0xff64f34e8511693e3dffa0e1fe037a6a65f3937b': 0.65,
  '0xda710f34b019ece6fa2c3e8b7f35b80d207e5f26': 0.637048793,
  '0xffa6adec873c41f08d6d28d8f4eb978f968969f3': 0.601793400916667,
  '0x73252eb9acd762674aaaa349b9e49a151703e59a': 0.6,
  '0x17bcefc1f6afeb3e849558fa8917e464ddb0eaf0': 0.6,
  '0xb19f6698d63d51cfa0d6eb4490ca83fcd640f462': 0.6,
  '0x83a76d1a2b69f2fbd75fb1b25bee9c2aa048ee94': 0.5495,
  '0xac70623ecc6244a95528966f2ec1910a48e66c5c': 0.53271998,
  '0x40914b243b1bc8327d4866be7b4c676146ea6155': 0.53198541,
  '0x40480d169c298820fc7929c8f9326eca2e7325ed': 0.53,
  '0x8f2a566330810f6c063144c421b4d8e9609073e9': 0.525,
  '0x81517784e00035b9d0691838ee7fdfa8f6e0c13c': 0.51477756,
  '0xcf03d23cdf439ed0cb95672cb2b34192e39b1725': 0.5,
  '0xdf79bfabfde34f2b919d8b4245611215c3ab74ea': 0.5,
  '0x294ed43d8eaa65dc487e7f6a89e07ad8776b0fe6': 0.5,
  '0x14a1ab5ec8ad20b1f63416424f1d7340c03959c3': 0.5,
  '0x284eb59c95ed4d1e1fca054718992e1ef95b24d3': 0.5,
  '0xa5a03220f753d0153330b70870df298d0df2dead': 0.5,
  '0x4b85e9d2e433d7eca29f8a7a859cf0346702c89a': 0.5,
  '0x1c11151da533b9a0c6431546207d60cc22df635d': 0.5,
  '0xc33c6a3da5681c942166fa17c1b7dfbad04ac7e5': 0.5,
  '0x03ac2c2132b3426270b786c8671031b9027b0150': 0.49667377,
  '0x362d10aa9cd144fdad06663933a9a90664f80015': 0.49508695,
  '0x85d43c45ae017e713cf48d4e0a15cace1db24595': 0.49,
  '0x6fb5bf437ec6923233b752cc2473bd79b111de91': 0.4854,
  '0x83ad1fe3359b181ce0218e02fdb9835429c84e99': 0.45,
  '0xafc52a008db0a954adc715c5525fd73c016243b9': 0.432757271943767,
  '0x487d03af4cbabb6cd2e0e1847b90c28cb1e392e0': 0.4,
  '0x795b34f57a3b7acaf42ea35a65277915eabd44ba': 0.4,
  '0xe5d4aafc54cf15051bbe0ba11f65de4f4ccedbc0': 0.375,
  '0xdbd5bd732e067c185bbf6b4bd5b526216d03bf1a': 0.36341878,
  '0x3c6e761fbbcdb9fa09179fe9eb07fc42138917b0': 0.3,
  '0x4d955701d1e24cb1df0a32e4460766ae0dee4a91': 0.3,
  '0xc7b51a1637f86f130686eebd1aae67c051888351': 0.276,
  '0x1934b89816be027a0e4e6fefe10df99c53dbc5b0': 0.2665,
  '0xc61adafdcf4daf0d7c5038682abce5229de8fd8f': 0.25,
  '0xfbc3c330ecaed20bd13c365d9f8d2c0585e5df61': 0.25,
  '0x449b938b22df2cd93de180acad82832c96919b19': 0.2,
  '0x3c5f5726ec0e33c0911bcad911222c39f1705515': 0.2,
  '0x8c2236bcd94b4dd7c34152f05993b65a07433359': 0.2,
  '0xee94f87415834df846ae1eaa445d6a89b9f4a671': 0.2,
  '0x4ae85c3dce203e061c1be091e297c27f9eb96764': 0.2,
  '0x38a3b8209d01901313db94e50decdfdf04e49436': 0.2,
  '0x42e3c75a55de1720a80d664b11b6971a994e7052': 0.195,
  '0x8da2b5b00a0c6d4988e858335aceee4ca21880df': 0.19,
  '0x06290448fa720ce06d26506981c96df56e29c716': 0.188677,
  '0xaaef2da178adb78bcdb64114f677db598e7c4bd5': 0.18,
  '0x9672f8600fe332f5470d554046e1177c546ee313': 0.15,
  '0xd2539c12d62176934c1c77725d0d2a6b796a14dd': 0.147,
  '0xd99c3c73ed2e379c91b25f5d05b46550d47e63df': 0.14,
  '0x4c8f8db94d1bf1f44c00196547182a401b99dd3a': 0.13,
  '0x52b8398551bb1d0bdc022355897508f658ad42f8': 0.123,
  '0x5aa966640a798f4b33ca50be5c0629c546217c68': 0.115,
  '0x940a5141bc0468fb3de062dfe08bab951666825e': 0.11,
  '0x84f4925b5973e5230094d584c49eb82ab1b342c6': 0.105,
  '0x186cecff56962463fd1930e79b92c71cfc06df09': 0.1,
  '0xcbf8dff8696cb3bafb257b4d236fabfec2b6a2f4': 0.1,
  '0x79e95f5b9679ca97da6823864548b223024f56ff': 0.1,
  '0x1b2d46ff65458bbbee87ccfa1fc2de8f4222b1b2': 0.1,
  '0x3028bd3d6472ebf58ba9e1319ebc0c246de4ec17': 0.1,
  '0x999f8bd19bfd874f0132f80526952428f6380222': 0.09973061,
  '0x4fef95c773da7c984a0b8b752930d49d0403d3a6': 0.095,
  '0xa3811153ed49e676fd34ac295dcf59cfa2824dde': 0.0908693324953383,
  '0x04e395d8287a8f8f527ec6906139d3903ead89a8': 0.083333333333333,
  '0x045b90f5ac7aa867ec2d156a7050d2cac06637e3': 0.081,
  '0x2dfa015bbe3fc87d28cc91f022499d572d6c7708': 0.08,
  '0x00e451a8ef40ab8d05f3b405bf3cf824630a8b9e': 0.075,
  '0x49b79aa484512a7f7f6941eeadf641c31811231c': 0.075,
  '0x2274581a4eac8ed678230a62b2b6866eb598363d': 0.06,
  '0xb9bfdb3150fdf4e689528090159e25920947487f': 0.05094,
  '0x7483081f5fb634b4bcfce6d2180ff43753d0770c': 0.05,
  '0x2db3c22da3ce43dc3314f24295c1d57f78d3616c': 0.05,
  '0x088ded09e04d55de0342a02ab31cf3ed28d07ad0': 0.05,
  '0x53764fa123413971f58daae03c00c30fc77e9db7': 0.05,
  '0x79bf66a8f0c66789463a85aa165adf1331d7b5ab': 0.05,
  '0x532cbc68f66bb7482086a15972fa20ee3aca21c4': 0.045,
  '0x63a1d3dbec37ca4b1db520056e8f82534376b24b': 0.025,
  '0x14c60db7945188f15e136c34f05f87a3086d5361': 0.01,
  '0xc5b23f4a9877e708924e09baca19e6057d560524': 0.01,
  '0x335834ad9d8702617a388b7072f5a70553e4c99f': 0.005,
  '0x6b3de9b20455f4cc16d3f82798c0f3d1f5382ff7': 0.0045,
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
