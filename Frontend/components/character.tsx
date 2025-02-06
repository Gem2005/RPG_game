'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Effect {
  type: 'damage' | 'heal' | 'damageAndStun' | 'damageReduction' | 'invulnerability' | 'aoeDamage' | 'speedBoost' | 'poison' | 'multiDamage' | 'shield' | 'revive' | 'instantKill' | 'manaCostPercentage' | 'nothing'; // The actual effect types
  damage?: number; // Damage value, if applicable
  healingAmount?: number; // Healing amount, if applicable
  stunDuration?: number; // Duration of stun, if applicable
  damageReduction?: number; // Damage reduction percentage, if applicable
  duration?: number; // Duration in turns, if applicable
  speedIncrease?: number; // Speed increase, if applicable
  speedReduction?: number; // Speed reduction, if applicable
  absorbs?: number; // Number of attacks absorbed, if applicable
  poisonChance?: number; // Chance to poison, if applicable
  successThreshold?: number; // Roll requirement for instant kill
  manaCostPercentage?: number; // Percentage of mana cost for abilities
  targets?: number; // Number of targets for multi-damage
  defenseReduction?: number; // Defense reduction, if applicable
  radius?: number; // Radius for AoE effects
}

interface Power {
  name: string;
  cost: number; // Mana cost
  effect: Effect;
  rollRequirement : number;
}

interface CharacterProps {
  num: number;
  name: string;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  onAttack: (index: number, attackValue: number, Power: { cost: number; effect: Effect } , rollDice : number) => void;
  opponents: { name: string; health: number }[];
  powers: Power[];
  imageUrl: string;
  attackingImageUrl: string;
  powerImageUrl: string;
  eliminationImageUrl: string;
  eliminatedImageUrl: string;
  position: string;
  canAttack: boolean;
  isAttacking: boolean; 
}

const Character = ({
  num,
  name,
  health,
  maxHealth,
  mana,
  maxMana,
  onAttack,
  opponents,
  powers,
  imageUrl,
  attackingImageUrl,
  powerImageUrl,
  eliminationImageUrl,
  eliminatedImageUrl,
  position,
  canAttack,
  isAttacking
}: CharacterProps) => {
  const [selectedOpponent, setSelectedOpponent] = useState<number | null>(null);
  const [selectedPower, setSelectedPower] = useState<Power | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isEliminated, setIsEliminated] = useState(false);
  const [showEliminationAnimation, setShowEliminationAnimation] = useState(false);

  const getCurrentImage = () => {
    if (showEliminationAnimation) {
      return eliminationImageUrl;
    } else if (isEliminated) {
      return eliminatedImageUrl;
    } else if (isAttacking) {
      return selectedPower?.name === 'Special Power' ? powerImageUrl : attackingImageUrl;
    } else {
      return imageUrl;
    }
  };

  useEffect(() => {
    if (health <= 0 && !isEliminated) {
      setShowEliminationAnimation(true);
      setTimeout(() => {
        setShowEliminationAnimation(false);
        setIsEliminated(true);
      }, 3000); // Display elimination animation for 3 seconds
    }
  }, [health, isEliminated]);


  function rollDice(): number {
    return Math.floor(Math.random() * 20) + 1; // Roll a d20
  }

  const handleAttack = () => {
    if (selectedOpponent !== null && selectedPower !== null) {
      // Ensure that selectedPower has a defined cost and effect before proceeding
      let powerCost = selectedPower?.cost || 0;
      let powerEffect = selectedPower?.effect || { damage: 0 };
      onAttack(selectedOpponent, powerEffect.damage || 0, { cost: powerCost, effect: powerEffect} , rollDice()<selectedPower.rollRequirement ? 0 : 1);
    }
  };



  return (
    <div
      className={`text-center group`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div className="mb-2 w-1/2">
        <p>Health: {health > 0 ? health : 'Eliminated'}</p>
        <p>Mana: {mana}/{maxMana}</p>
        <p>{name}</p>
        {health > 0 && (
          <div className="w-full bg-gray-600 h-2 rounded mt-2">
            <div
              className="bg-red-500 h-full rounded"
              style={{ width: `${(health / maxHealth) * 100}%` }}
            />
          </div>
        )}
      </div>
      <Image
        src={getCurrentImage()}
        alt={name}
        width={144} // set appropriate width
        height={144} // set appropriate height
        className={`h-36 object-cover rounded-full ${position === 'right' && 'scale-x-[-1]'}`}
      />
      {isHovered && canAttack && health > 0 && (
        <div className=" hidden group-hover:flex flex-col items-center justify-center bg-white p-4 rounded shadow-lg">
          <div className="text-lg font-bold mb-2">{name}</div>
          {health > 0 && (
            <>
              <div className="mt-2">
                <select
                  className="p-2 border rounded bg-gray-800"
                  value={selectedOpponent !== null ? selectedOpponent : ''}
                  onChange={(e) => setSelectedOpponent(Number(e.target.value))}
                >
                  <option value="">Select Opponent</option>
                  {opponents.map((opponent, index) => (
                    <option key={index} value={index}>
                      {opponent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-2">
                <select
                  className="p-2 border rounded bg-gray-800 text-xs"
                  value={selectedPower !== null ? selectedPower.name : ''}
                  onChange={(e) => {
                    const power = powers.find((p) => p.name === e.target.value);
                    setSelectedPower(power || null);
                  }}
                >
                  <option value="">Select Power</option>
                  {powers.map((power, index) => (
                    <option key={index} value={power.name}>
                      {power.name} (Cost: {power.cost}, Damage: {power.effect.damage || 0})
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={handleAttack}
                disabled={selectedOpponent === null || selectedPower === null || mana < selectedPower.cost}
              >
                Attack
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Character;
