import { useState, type CSSProperties } from "react";
import "./MemoryGame.css";
import {
  type Card,
  clampPairCount,
  DEFAULT_PAIR_COUNT,
  generateBoard,
  MATCH_DELAY_MS,
  MAX_PAIR_COUNT,
  MIN_PAIR_COUNT,
  MISMATCH_DELAY_MS,
  PAIR_COUNT_STEP,
} from "./utilities/constants";

const MemoryGame = () => {
  const [pairCount, setPairCount] = useState(DEFAULT_PAIR_COUNT);
  const [cards, setCards] = useState<Card[]>(() =>
    generateBoard(DEFAULT_PAIR_COUNT),
  );
  const [flipped, setFlipped] = useState<Card[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);

  const gridColumns = pairCount / 2;
  const gameOver =
    cards.length > 0 && cards.every((card) => card.isMatched);

  const resetGame = (count: number) => {
    const safeCount = clampPairCount(count);
    setPairCount(safeCount);
    setCards(generateBoard(safeCount));
    setFlipped([]);
    setIsLocked(false);
    setMoves(0);
  };

  const handlePairCountChange = (value: string) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return;
    }

    resetGame(parsed);
  };

  const handleClick = (card: Card) => {
    if (isLocked || card.isFlipped || card.isMatched) {
      return;
    }

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c,
    );

    const newFlipped = [...flipped, card];

    setCards(updatedCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [first, second] = newFlipped;

      if (first.emoji === second.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isMatched: true }
                : c,
            ),
          );
          setFlipped([]);
          setIsLocked(false);
        }, MATCH_DELAY_MS);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c,
            ),
          );
          setFlipped([]);
          setIsLocked(false);
        }, MISMATCH_DELAY_MS);
      }
    }
  };

  const handleReset = () => {
    resetGame(pairCount);
  };

  return (
    <div className="memory-game">
      <div className="memory-game__header">
        <h4 className="memory-game__title">🧠 Memory Game</h4>
        <p className="memory-game__moves">Moves: {moves}</p>
        <label className="memory-game__control">
          Pairs
          <input
            type="number"
            className="memory-game__count-input"
            min={MIN_PAIR_COUNT}
            max={MAX_PAIR_COUNT}
            step={PAIR_COUNT_STEP}
            value={pairCount}
            onChange={(event) => handlePairCountChange(event.target.value)}
          />
        </label>
      </div>

      <div
        className="memory-game__grid"
        style={{ "--grid-columns": gridColumns } as CSSProperties}
      >
        {cards.map((card) => {
          const isVisible = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              type="button"
              className={`memory-game__card${card.isMatched ? " memory-game__card--matched" : ""}`}
              aria-label={
                isVisible ? `Card showing ${card.emoji}` : "Face-down card"
              }
              aria-pressed={isVisible}
              disabled={card.isMatched || isLocked}
              onClick={() => handleClick(card)}
            >
              <span
                className={`memory-game__emoji${isVisible ? "" : " memory-game__emoji--hidden"}`}
              >
                {card.emoji}
              </span>
            </button>
          );
        })}
      </div>

      {gameOver && (
        <div className="memory-game__win">
          <h3 className="memory-game__win-title">🎉 You Won!</h3>
          <button
            type="button"
            className="memory-game__play-again"
            onClick={handleReset}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
