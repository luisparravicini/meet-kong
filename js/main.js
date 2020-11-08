/* keep encoding as iso-8859-1 */

async function printCharset(screen, spaces) {
  let chars =[32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 
              52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 
              0, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 
              88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 
              105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 
              120, 121, 122, 123, 124, 125, 126, 163, 176, 177, 178, 179, 180, 181, 182, 
              183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 
              198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 
              213, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250];
  let x = 0;
  let y = 0;
  let chars_to_print = [...chars];
  if (spaces > 0) {
    chars_to_print = chars_to_print.
                        map((value) => [value, ' '.repeat(spaces)]).
                        flat();
  }
  for (let i = 0; i < chars_to_print.length; i++) {
    let c = String.fromCharCode(chars_to_print[i]);

    await screen.set_char(x, y, c);

    x += 1;
    if (x >= screen.size.x) {
      x = 0;
      y += (spaces + 1);
    }
  }
}

async function main() {
  let screen = new Screen('main');
  let level = new Level(screen);

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented)
      return;

    console.log('[input]', event.key);

    switch (event.key) {
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        break;
      case '1':
        screen.clear();
        printCharset(screen, 0);
        break;
      case '2':
        screen.clear();
        printCharset(screen, 1);
        break;
      case '3':
        screen.clear();
        level.draw();
        break;
    }
  });

  // screen.clear();
  // for (let i = 0; i < screen.size.y; i++)
  //   await screen.print('01234567890123456789012345678901');

  screen.clear();
  // printCharset(screen);

    let levelData = [
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
  level.load(levelData);
  level.draw(screen);
}
