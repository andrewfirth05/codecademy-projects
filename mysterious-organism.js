// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for creating instances of P. Aequor
const pAequorFactory = (num, dnaArr) => {
  return {
    specimenNum: num,
    dna: dnaArr,
    // Mutates the DNA by replacing a random base with a different base
    mutate: function () {
      let dnaBases = ["A", "T", "C", "G"];
      let randDnaBaseIndex = Math.floor(Math.random() * 15);
      let alternateDnaBases = dnaBases.filter(
        (base) => base !== this.dna[randDnaBaseIndex]
      );
      this.dna[randDnaBaseIndex] =
        alternateDnaBases[Math.floor(Math.random() * 3)];
      return this.dna;
    },
    // Compares the current DNA with another DNA strand and returns the percentage of matched bases
    compareDna: function (pAequor) {
      let matchBases = [];
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] == pAequor.dna[i]) {
          matchBases.push(this.dna[i]);
        }
      }
      let matchedPercentage = Math.round(
        (matchBases.length / this.dna.length) * 100
      );
      console.log(
        `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${matchedPercentage}% DNA in common.`
      );
    },
    // Creates the complimentary DNA strand by copying with A & T and C & G swapped around
    complementStrand() {
      let complementStrandArr = [];
      for (i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case "A":
            complementStrandArr.push("T");
            break;
          case "T":
            complementStrandArr.push("A");
            break;
          case "C":
            complementStrandArr.push("G");
            break;
          case "G":
            complementStrandArr.push("C");
            break;
        }
      }
      return complementStrandArr;
    },
    // Returns whether the DNA stran will likely survive based on the logic of having 60% or more C & G bases
    willLikelySurvive: function () {
      let cAndG = this.dna.filter((base) => base == "C" || base == "G");
      return (cAndG.length / this.dna.length) * 100 >= 60 ? true : false;
    },
  };
};

let pAequorArray = [];
let id = 0;

// Function for batch producing 30 P. Aequor instances that are likely to survive
const batchAequor = () => {
  while (pAequorArray.length < 30) {
    let aequorInstance = pAequorFactory(id, mockUpStrand());
    if (aequorInstance.willLikelySurvive()) {
      pAequorArray.push(aequorInstance);
    }
    id++;
  }
};

/*
Haven't completed the below project extension.
"Use the .compareDNA() to find the two most related instances of pAequor."
*/
