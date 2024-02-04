const whitePieces = document.querySelectorAll(".white_pieces");
const blackPieces = document.querySelectorAll(".black_pieces");
const arrows = document.querySelectorAll(".arrow");

const bar = document.querySelector(".middle-bar");

let draggedPiece;

const outPieces = [];
let isOut = false;

const movePieces = (pieces) => {
  pieces.forEach((piece) => {
    piece.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", piece.id);
      event.target.classList.add("active");
      draggedPiece = piece;
    });
  });
  arrows.forEach((arrow) => {
    arrow.addEventListener("dragover", (event) => {
      const targetArrow = event.target.closest(".arrow");
      arrow.classList.add("cover");

      // check collision between pieces and board margin
      if (event.clientY > 295 && event.clientY < 716) {
        event.preventDefault();
      }

      const nr = numberPieces(targetArrow);

      // maximul number of pieces on an arrow must be five
      if (nr >= 5) {
        event.dataTransfer.dropEffect = "none";
      }

      // Check if arrow has one piece and which type is the second one
      if (nr == 1) {
        const isWhitePieces =
          targetArrow.children[0].classList.contains("white_pieces");
        const isBlackPieces =
          targetArrow.children[0].classList.contains("black_pieces");

        if (
          (isWhitePieces && draggedPiece.classList.contains("black_pieces")) ||
          (isBlackPieces && draggedPiece.classList.contains("white_pieces"))
        ) {
          isOut = true;
        }
      }

      // When on the arrow are at least two pieces, the third piece must has the same color as the first two

      if (nr >= 2) {
        const isWhitePieces =
          targetArrow.children[0].classList.contains("white_pieces") &&
          targetArrow.children[1].classList.contains("white_pieces");
        const isBlackPieces =
          targetArrow.children[0].classList.contains("black_pieces") &&
          targetArrow.children[1].classList.contains("black_pieces");

        if (
          (isWhitePieces && draggedPiece.classList.contains("black_pieces")) ||
          (isBlackPieces && draggedPiece.classList.contains("white_pieces"))
        ) {
          event.dataTransfer.dropEffect = "none";
        }
      }
    });

    arrow.addEventListener("dragleave", () => {
      arrow.classList.remove("cover");
    });
    arrow.addEventListener("drop", (event) => {
      const pieceId = event.dataTransfer.getData("text/plain");
      draggedPiece = document.getElementById(pieceId);
      const targetArrow = event.target.closest(".arrow");

      const rect = targetArrow.getBoundingClientRect();

      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      draggedPiece.style.left = offsetX + targetArrow.offsetLeft + "px";
      draggedPiece.style.top = offsetY + targetArrow.offsetTop + "px";
      draggedPiece.classList.add("centered");

      targetArrow.appendChild(draggedPiece);

      // Adding pieces to array and adding to the bar, which have been out from arrows by the opposition
      if (isOut == true) {
        barPiece = targetArrow.children[0];
        outPieces.push(barPiece);
        console.log(outPieces.length);
        bar.addEventListener("dragover", (event) => {
          event.preventDefault();
          bar.classList.add("cover");
        });
        bar.addEventListener("drop", (event) => {
          const targetBar = event.target.closest(".middle-bar");
          const rectBar = targetBar.getBoundingClientRect();
          const offsetX = event.clientX - rectBar.left;
          const offsetY = event.clientY - rectBar.top;
          barPiece.style.left = offsetX + "px";
          barPiece.style.top = offsetY + "px";
          barPiece.classList.add("centered");
          targetBar.appendChild(barPiece);
          bar.classList.remove("cover");
        });
      }
      draggedPiece.classList.remove("active");
      targetArrow.classList.remove("cover");
      isOut = false;
    });
  });
};

// no of Pieces from one arrow
const numberPieces = (arrow) => {
  return arrow.children.length;
};

movePieces(whitePieces);
movePieces(blackPieces);
