
module.exports = selection_to_reference;

function selection_to_reference(slip_id, size) {
  var reference = 'x';
  if(slip_id == 'slip_bleu') reference = 'blue_';
  if(slip_id == 'slip_rouge') reference = 'red_';
  if(slip_id == 'slip_gris') reference = 'grey_';
  if(slip_id == 'slip_blanc') reference = 'white_';

  if(size == 'size_item_s') reference += 's';
  if(size == 'size_item_m') reference += 'm';
  if(size == 'size_item_l') reference += 'l';
  return reference;
}
