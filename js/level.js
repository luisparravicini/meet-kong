/* keep encoding as iso-8859-1 */

class Level {

  constructor(screen) {
    this.screen = screen;
  }

  async draw() {
    let level = [
      ' SCORE=00000            LIVES=3 ',
      '          o                     ',
      '                        *  ³    ',
      '    ½           תתתHתתתתת µ"ץ   ',
      '    תתתHתתתת       H    ·_._._פ ',
      '       H           H    µס´_קעץ ',
      '       H           H     µ_ _ץ  ',
      'o      H           H      _ _   ',
      'תתתתHתתתתתתתתתתHתתתתתתתתתתתתתתתת',
      '    H          H                ',
      ' ½  H          H             ½  ',
      'תתתתתתתת   תתתתתתתתHתת   תתתתתתת',
      '                   H            ',
      '            ½      H            ',
      'תתתHתתתתתתתתתת   תתתתת   תתHתתתת',
      '   H                       H    ',
      '   H                       H    ',
      ' תתתתתתתHתתתתת   תתתתHתתתתתתתת  ',
      '        H            H          ',
      '        H            H          ',
      'תHתתתתתתתתתתתתתHתתתתתתתתתתתתתHתת',
      ' H             H             H  ',
      ' H             H             H  ',
      '÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷',
    ];
    for (let i = 0; i < level.length; i++) {
      await this.screen.print(level[i]);
    }
  }

}
