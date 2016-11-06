var patternsDB = [{"id":"1270090844","name":"Horizontal bricks","position":{"x":-512,"y":-256,"z":-100},"size":{"x":736,"y":288,"z":0},"nodes":[{"id":"1270088090","name":"shape","position":{"x":-432,"y":-144,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Pattern","value":"8","valueType":"constantValueInt32"},{"name":"Pattern Specific","value":"0.100000001","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270088091"]},{"id":"1270088351","name":"blend","position":{"x":-176,"y":-144,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"blendingmode","value":"5","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270088090","fromOutputId":"1270088091","toNodeId":"1270088351","name":"source"},{"fromNodeId":"1270090304","fromOutputId":"1270090305","toNodeId":"1270088351","name":"destination"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270088352"]},{"id":"1270089397","name":"tile generator","position":{"x":-16,"y":-144,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Nb X","value":0,"valueType":"dynamicValue"},{"name":"Nb Y","value":0,"valueType":"dynamicValue"},{"name":"Offset","value":"0.5","valueType":"constantValueFloat1"},{"name":"Pattern Type","value":"1","valueType":"constantValueInt32"},{"name":"BlendingMode","value":"2","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270088351","fromOutputId":"1270088352","toNodeId":"1270089397","name":"Source"}],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270089398"]},{"id":"1270090304","name":"transformation","position":{"x":-304,"y":-80,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"offset","value":"0.5 0","valueType":"constantValueFloat2"},{"name":"matrix22","value":"2 0 0 1","valueType":"constantValueFloat4"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270088090","fromOutputId":"1270088091","toNodeId":"1270090304","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270090305"]},{"id":"1270090885","name":"Output","position":{"x":144,"y":-144,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":true,"outputName":"mask","inputs":[{"fromNodeId":"1270089397","fromOutputId":"1270089398","toNodeId":"1270090885","name":""}],"isFilter":false,"isGenerator":false,"isBitmap":false,"outputs":[]}]},{"id":"1270091338","name":"Herringbone bricks","position":{"x":-512,"y":96,"z":-100},"size":{"x":992,"y":416,"z":0},"nodes":[{"id":"1270091057","name":"tile generator","position":{"x":112,"y":400,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Nb X","value":"4","valueType":"constantValueInt32"},{"name":"Nb Y","value":"8","valueType":"constantValueInt32"},{"name":"VerticalMask","value":"1","valueType":"constantValueBool"},{"name":"Offset","value":"0.5","valueType":"constantValueFloat1"},{"name":"Pattern Type","value":"2","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270091058"]},{"id":"1270091120","name":"tile generator","position":{"x":-16,"y":208,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Pattern Type","value":"1","valueType":"constantValueInt32"},{"name":"Nb X","value":"4","valueType":"constantValueInt32"},{"name":"Nb Y","value":"8","valueType":"constantValueInt32"},{"name":"Offset","value":"0.5","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270091123","fromOutputId":"1270088352","toNodeId":"1270091120","name":"Source"}],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270089398"]},{"id":"1270091121","name":"transformation","position":{"x":-304,"y":272,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"offset","value":"0.5 0","valueType":"constantValueFloat2"},{"name":"matrix22","value":"2 0 0 1","valueType":"constantValueFloat4"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270091122","fromOutputId":"1270088091","toNodeId":"1270091121","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270090305"]},{"id":"1270091122","name":"shape","position":{"x":-432,"y":208,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Pattern","value":"8","valueType":"constantValueInt32"},{"name":"Pattern Specific","value":"0.100000001","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270088091"]},{"id":"1270091123","name":"blend","position":{"x":-176,"y":208,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"blendingmode","value":"5","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270091122","fromOutputId":"1270088091","toNodeId":"1270091123","name":"source"},{"fromNodeId":"1270091121","fromOutputId":"1270090305","toNodeId":"1270091123","name":"destination"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270088352"]},{"id":"1270091124","name":"Output","position":{"x":400,"y":208,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":true,"outputName":"mask_1","inputs":[{"fromNodeId":"1270091173","fromOutputId":"1270091174","toNodeId":"1270091124","name":""}],"isFilter":false,"isGenerator":false,"isBitmap":false,"outputs":[]},{"id":"1270091173","name":"blend","position":{"x":240,"y":208,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270091057","fromOutputId":"1270091058","toNodeId":"1270091173","name":"opacity"},{"fromNodeId":"1270091120","fromOutputId":"1270089398","toNodeId":"1270091173","name":"source"},{"fromNodeId":"1270091197","fromOutputId":"1270091198","toNodeId":"1270091173","name":"destination"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270091174"]},{"id":"1270091197","name":"transformation","position":{"x":112,"y":272,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"matrix22","value":"0 -1 1 0","valueType":"constantValueFloat4"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270091120","fromOutputId":"1270089398","toNodeId":"1270091197","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270091198"]}]},{"id":"1270461316","name":"Cellular lines","position":{"x":-512,"y":640,"z":-100},"size":{"x":736,"y":288,"z":0},"nodes":[{"id":"1270461242","name":"tile random","position":{"x":-432,"y":752,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"pattern","value":"3","valueType":"constantValueInt32"},{"name":"shape scale","value":"0.560000002","valueType":"constantValueFloat1"},{"name":"shape scale_random","value":"0.419999987","valueType":"constantValueFloat1"},{"name":"position random","value":"1","valueType":"constantValueFloat1"},{"name":"shape rotation_random","value":"1","valueType":"constantValueFloat1"},{"name":"pattern color_random","value":"1","valueType":"constantValueFloat1"},{"name":"position offset","value":"0.459999979","valueType":"constantValueFloat1"},{"name":"size random_y","value":"0.400000006","valueType":"constantValueFloat1"},{"name":"size random_x","value":"0.300000012","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270461243"]},{"id":"1270462030","name":"levels","position":{"x":-304,"y":816,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"levelinmid","value":"0.524163544 0.524163544 0.524163544 0.5","valueType":"constantValueFloat4"},{"name":"levelinhigh","value":"0.0330739282 0.0330739282 0.0330739282 1","valueType":"constantValueFloat4"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270461242","fromOutputId":"1270461243","toNodeId":"1270462030","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270462031"]},{"id":"1270462045","name":"distance","position":{"x":-184.181046,"y":756.899658,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"distance","value":"73.6999969","valueType":"constantValueFloat1"},{"name":"combinedistance","value":"0","valueType":"constantValueBool"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270461242","fromOutputId":"1270461243","toNodeId":"1270462045","name":"source"},{"fromNodeId":"1270462030","fromOutputId":"1270462031","toNodeId":"1270462045","name":"mask"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270462046"]},{"id":"1270463895","name":"edge detect","position":{"x":-16,"y":752,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270462045","fromOutputId":"1270462046","toNodeId":"1270463895","name":""}],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270463896"]},{"id":"1270466605","name":"Output","position":{"x":144,"y":752,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":true,"outputName":"output","inputs":[{"fromNodeId":"1270463895","fromOutputId":"1270463896","toNodeId":"1270466605","name":""}],"isFilter":false,"isGenerator":false,"isBitmap":false,"outputs":[]}]},{"id":"1270464565","name":"Fossils","position":{"x":-512,"y":1024,"z":-100},"size":{"x":896,"y":352,"z":0},"nodes":[{"id":"1270464562","name":"edge detect","position":{"x":-16,"y":1136,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"edge width","value":"2.19000006","valueType":"constantValueFloat1"},{"name":"edge roundness","value":"3.21000004","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270464563","fromOutputId":"1270462046","toNodeId":"1270464562","name":""}],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270463896"]},{"id":"1270464563","name":"distance","position":{"x":-176,"y":1136,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"distance","value":"197.819992","valueType":"constantValueFloat1"},{"name":"colorswitch","value":"0","valueType":"constantValueBool"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270464564","fromOutputId":"1270461243","toNodeId":"1270464563","name":"source"},{"fromNodeId":"1270464566","fromOutputId":"1270462031","toNodeId":"1270464563","name":"mask"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270462046"]},{"id":"1270464564","name":"tile random","position":{"x":-432,"y":1136,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"pattern","value":"3","valueType":"constantValueInt32"},{"name":"shape scale","value":"0.560000002","valueType":"constantValueFloat1"},{"name":"shape scale_random","value":"0.419999987","valueType":"constantValueFloat1"},{"name":"position random","value":"1","valueType":"constantValueFloat1"},{"name":"shape rotation_random","value":"1","valueType":"constantValueFloat1"},{"name":"pattern color_random","value":"1","valueType":"constantValueFloat1"},{"name":"position offset","value":"0.459999979","valueType":"constantValueFloat1"},{"name":"size random_y","value":"0.400000006","valueType":"constantValueFloat1"},{"name":"size random_x","value":"0.300000012","valueType":"constantValueFloat1"},{"name":"split multiplier","value":"3","valueType":"constantValueInt32"},{"name":"split threshold","value":"0.620000005","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270461243"]},{"id":"1270464566","name":"levels","position":{"x":-304,"y":1200,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"levelinmid","value":"0.524163544 0.524163544 0.524163544 0.5","valueType":"constantValueFloat4"},{"name":"levelinhigh","value":"0.0330739282 0.0330739282 0.0330739282 1","valueType":"constantValueFloat4"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270464564","fromOutputId":"1270461243","toNodeId":"1270464566","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270462031"]},{"id":"1270464717","name":"perlin noise_zoom","position":{"x":-16,"y":1264,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270464718"]},{"id":"1270464742","name":"warp","position":{"x":144,"y":1136,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270464717","fromOutputId":"1270464718","toNodeId":"1270464742","name":""},{"fromNodeId":"1270464562","fromOutputId":"1270463896","toNodeId":"1270464742","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270464743"]},{"id":"1270466629","name":"Output","position":{"x":304,"y":1136,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":true,"outputName":"output_1","inputs":[{"fromNodeId":"1270464742","fromOutputId":"1270464743","toNodeId":"1270466629","name":""}],"isFilter":false,"isGenerator":false,"isBitmap":false,"outputs":[]}]},{"id":"1270510015","name":"Crackify lines","position":{"x":-544,"y":1536,"z":0},"size":{"x":800,"y":352,"z":0},"nodes":[{"id":"1270510334","name":"slope blur_grayscale","position":{"x":-144,"y":1648,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Intensity","value":"0.479999989","valueType":"constantValueFloat1"},{"name":"mode","value":"6","valueType":"constantValueInt32"},{"name":"Samples","value":"10","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270511568","fromOutputId":"1270511569","toNodeId":"1270510334","name":"Effect"},{"fromNodeId":"1270515401","fromOutputId":"1270515402","toNodeId":"1270510334","name":"Source"}],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270510335"]},{"id":"1270511568","name":"blur","position":{"x":-304,"y":1776,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"intensity","value":"1.17999995","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270512460","fromOutputId":"1270512461","toNodeId":"1270511568","name":""}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270511569"]},{"id":"1270512460","name":"clouds 1","position":{"x":-464,"y":1776,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"Disorder","value":"35.9799995","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":false,"isGenerator":true,"isBitmap":false,"outputs":["1270512461"]},{"id":"1270512639","name":"blend","position":{"x":16,"y":1648,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"blendingmode","value":"3","valueType":"constantValueInt32"},{"name":"opacitymult","value":"0.329999983","valueType":"constantValueFloat1"}],"isOutputNode":false,"outputName":null,"inputs":[{"fromNodeId":"1270510334","fromOutputId":"1270510335","toNodeId":"1270512639","name":"destination"},{"fromNodeId":"1270510334","fromOutputId":"1270510335","toNodeId":"1270512639","name":"source"}],"isFilter":true,"isGenerator":false,"isBitmap":false,"outputs":["1270512640"]},{"id":"1270514991","name":"Output","position":{"x":176,"y":1648,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[],"isOutputNode":true,"outputName":"output_3","inputs":[{"fromNodeId":"1270512639","fromOutputId":"1270512640","toNodeId":"1270514991","name":""}],"isFilter":false,"isGenerator":false,"isBitmap":false,"outputs":[]},{"id":"1270515401","name":"bitmap","position":{"x":-304,"y":1648,"z":0},"isDocked":false,"dockedPosition":{"x":0,"y":0,"z":0},"parameters":[{"name":"bitmapresourcepath","value":"pkg://Resources/PatternsProject_Simple_Patterns_output_2?dependency=1270508504","valueType":"constantValueString"},{"name":"outputsize","value":"9 9","valueType":"constantValueInt2"},{"name":"colorswitch","value":"0","valueType":"constantValueBool"},{"name":"format","value":"1","valueType":"constantValueInt32"}],"isOutputNode":false,"outputName":null,"inputs":[],"isFilter":true,"isGenerator":false,"isBitmap":true,"outputs":["1270515402"],"bitmap":"PatternsProject_Simple_Patterns_output_2.png"}]}];