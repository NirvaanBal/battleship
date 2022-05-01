const gameboardHTML = (board) => {
  let boardHTML = `
    <table>
      <tr>
        <td></td>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
        <td>7</td>
        <td>8</td>
        <td>9</td>
        <td>10</td>
      </tr>`;

  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'].forEach((row, index) => {
    boardHTML += `<tr><td>${row.toUpperCase()}</td>`;
    for (let i = 0; i < 10; i += 1) {
      if (board[+`${index}${i}`] === '') {
        boardHTML += '<td class="grid-item"></td>';
      } else boardHTML += '<td class="grid-item occupied">*</td>';
    }
    boardHTML += '</tr>';
  });

  boardHTML += '</table>';

  return boardHTML;
};

export default gameboardHTML;
