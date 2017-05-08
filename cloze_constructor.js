function ClozeCard(text, clozeDeletion) {

  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(text, clozeDeletion);
  }

  var clozeStartEnd = clozeDelete(text, clozeDeletion);

  this.partial = getPartial(text, clozeStartEnd);

  this.cloze = text.slice(clozeStartEnd[0], clozeStartEnd[1]);

  function getPartial(text, clozeStartEnd) {

    var start = text.slice(0, clozeStartEnd[0]);
    
    var end = text.slice(clozeStartEnd[1], text.length);

    return start + "..." + end;
  }

  function clozeDelete(text, clozeDeletion) {
    var start = text.indexOf(clozeDeletion);

    if (start !== -1) {
      return [start, start + clozeDeletion.length];
    }
    throw new Error("Cloze deletion not found.");
  }
}

ClozeCard.prototype.displayCard = function displayCard() {
  return this.partial.replace(/\.\.\./, "'" + this.cloze + "'");
};

module.exports = ClozeCard;