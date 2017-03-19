
module.exports = selection_to_reference;

function selection_to_reference(slip_id, size) {
  var reference = 'x';
  if(slip_id == 'slip_bleu') reference = 'blue_';
  if(slip_id == 'slip_rouge') reference = 'red_';
  if(slip_id == 'slip_gris') reference = 'grey_';
  if(slip_id == 'slip_blanc') reference = 'white_';

  if(size == 'S') reference += 's';
  if(size == 'M') reference += 'm';
  if(size == 'L') reference += 'l';
  return reference;
}
