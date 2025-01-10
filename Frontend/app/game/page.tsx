'use client';
import { useState, useEffect } from 'react';
import Character from '@/components/character';
const Characters: Character[] = [
  {
    name: 'Knight',
    health: 100,
    maxHealth: 100,
    mana: 80,
    maxMana: 80,
    powers: [
      {
        name: 'Shield Bash',
        cost: 20,
        rollRequirement: 12, // Dice roll must be >= 12 for success
        effect: {
          type: 'damageAndStun', 
          damage: 30,
          stunDuration: 1,
        },
      },
      {
        name: 'Guardian’s Vow',
        cost: 30,
        rollRequirement: 10, // Defensive moves usually have lower requirements
        effect: {
          type: 'damageReduction',
          damageReduction: 50,
          duration: 3,
        },
      },
      {
        name: 'Heavy Slam',
        cost: 25,
        rollRequirement: 14, // Higher roll needed for stronger attacks
        effect: {
          type: 'damage',
          damage: 40,
        },
      },
      {
        name: 'Iron Fortress',
        cost: 50,
        rollRequirement: 8, // Easier to activate, as it’s a defense move
        effect: {
          type: 'invulnerability',
          duration: 2,
        },
      },
      {
        name: 'Healing Shout',
        cost: 20,
        rollRequirement: 10,
        effect: {
          type: 'heal',
          healingAmount: 25,
        },
      },
    ],
    imageUrl: '/knight/standing.gif',
    attackingImageUrl: '/knight/attack.gif',
    powerImageUrl: '/knight/power attack.gif',
    eliminationImageUrl: '/knight/eliminating.gif',
    eliminatedImageUrl: '/knight/eliminated.gif',
  },
  {
    name: 'Archer',
    health: 90,
    maxHealth: 90,
    mana: 100,
    maxMana: 100,
    powers: [
      {
        name: 'Rapid Fire',
        cost: 25,
        rollRequirement: 12,
        effect: {
          type: 'damage',
          damage: 20,
        },
      },
      {
        name: 'Evasive Maneuver',
        cost: 15,
        rollRequirement: 10,
        effect: {
          type: 'speedBoost',
          speedIncrease: 5,
          duration: 2,
        },
      },
      {
        name: 'Arrow Storm',
        cost: 40,
        rollRequirement: 15, // AoE attacks often have higher thresholds
        effect: {
          type: 'aoeDamage',
          damage: 25,
        },
      },
      {
        name: 'Snipe',
        cost: 35,
        rollRequirement: 16,
        effect: {
          type: 'damage',
          damage: 60,
        },
      },
      {
        name: 'Volley of Arrows',
        cost: 60,
        rollRequirement: 14,
        effect: {
          type: 'multiDamage',
          damage: 30,
          targets: 3,
          speedReduction: 3,
        },
      },
    ],
    imageUrl: '/archer/standing.gif',
    attackingImageUrl: '/archer/attack.gif',
    powerImageUrl: '/archer/power attack.gif',
    eliminationImageUrl: '/archer/eliminating.gif',
    eliminatedImageUrl: '/archer/eliminated.gif',
  },
  {
    name: 'Bard',
    health: 80,
    maxHealth: 80,
    mana: 120,
    maxMana: 120,
    powers: [
      {
        name: 'Healing Melody',
        cost: 30,
        rollRequirement: 9, // Support abilities are easier to pull off
        effect: {
          type: 'heal',
          healingAmount: 30,
        },
      },
      {
        name: 'Harmonic Shield',
        cost: 25,
        rollRequirement: 11,
        effect: {
          type: 'shield',
          absorbs: 1,
        },
      },
      {
        name: 'Motivating Tune',
        cost: 15,
        rollRequirement: 9,
        effect: {
          type: 'speedBoost',
          speedIncrease: 5,
          duration: 2,
        },
      },
      {
        name: 'Discordant Strike',
        cost: 30,
        rollRequirement: 14, // AoE damage has higher difficulty
        effect: {
          type: 'aoeDamage',
          damage: 15,
          radius: 1,
        },
      },
      {
        name: 'Song of Rebirth',
        cost: 75,
        rollRequirement: 17, // Reviving is a powerful ability
        effect: {
          type: 'revive',
          healingAmount: 50,
        },
      },
    ],
    imageUrl: '/bard/standing.gif',
    attackingImageUrl: '/bard/attack.gif',
    powerImageUrl: '/bard/power attack.gif',
    eliminationImageUrl: '/bard/eliminating.gif',
    eliminatedImageUrl: '/bard/eliminated.gif',
  },
  {
    name: 'Assassin',
    health: 85,
    maxHealth: 85,
    mana: 90,
    maxMana: 90,
    powers: [
      {
        name: 'Shadow Strike',
        cost: 30,
        rollRequirement: 13,
        effect: {
          type: 'damage',
          damage: 50,
          poisonChance: 50,
        },
      },
      {
        name: 'Vanish',
        cost: 25,
        rollRequirement: 10,
        effect: {
          type: 'invulnerability',
          duration: 1,
        },
      },
      {
        name: 'Backstab',
        cost: 35,
        rollRequirement: 16,
        effect: {
          type: 'damage',
          damage: 70,
        },
      },
      {
        name: 'Blade Fury',
        cost: 40,
        rollRequirement: 12,
        effect: {
          type: 'multiDamage',
          damage: 30,
          targets: 3,
          defenseReduction: 2,
        },
      },
      {
        name: 'Assassinate',
        cost: 70,
        rollRequirement: 18, // Hardest attack to succeed
        effect: {
          type: 'instantKill',
          successThreshold: 18, // Needs high roll to kill instantly
        },
      },
    ],
    imageUrl: '/assassin/standing.gif',
    attackingImageUrl: '/assassin/attack.gif',
    powerImageUrl: '/assassin/power attack.gif',
    eliminationImageUrl: '/assassin/eliminating.gif',
    eliminatedImageUrl: '/assassin/eliminated.gif',
  },
  {
    name: 'Mage',
    health: 70,
    maxHealth: 70,
    mana: 200,
    maxMana: 200,
    powers: [
      {
        name: 'Fireball',
        cost: 25,
        rollRequirement: 12,
        effect: {
          type: 'damage',
          damage: 40,
        },
      },
      {
        name: 'Ice Lance',
        cost: 30,
        rollRequirement: 10,
        effect: {
          type: 'damage',
          damage: 30,
          speedReduction: 5,
        },
      },
      {
        name: 'Arcane Shield',
        cost: 40,
        rollRequirement: 9,
        effect: {
          type: 'damageReduction',
          damageReduction: 25,
          duration: 3,
        },
      },
      {
        name: 'Mana Burst',
        cost: 75,
        rollRequirement: 14,
        effect: {
          type: 'aoeDamage',
          damage: 50,
          manaCostPercentage: 50,
        },
      },
      {
        name: 'Meteor Shower',
        cost: 120,
        rollRequirement: 18, // Hard to cast but devastating
        effect: {
          type: 'aoeDamage',
          damage: 80,
          duration: 2,
        },
      },
    ],
    imageUrl: '/Mage/standing.gif',
    attackingImageUrl: '/Mage/attack.gif',
    powerImageUrl: '/Mage/power attack.gif',
    eliminationImageUrl: '/Mage/eliminating.gif',
    eliminatedImageUrl: '/Mage/eliminated.gif',
  },
];


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
  effect: Effect; // Detailed effect
  rollRequirement: number;
}

interface Character {
  name: string;
  health: number;
  maxHealth: number; // Track max health
  mana: number; // Current mana
  maxMana: number; // Max mana value
  powers: Power[];
  imageUrl: string; // URL for the character image
  attackingImageUrl: string; // URL for the attacking animation
  powerImageUrl: string; // URL for the power animation
  eliminationImageUrl: string; // URL for the elimination image
  eliminatedImageUrl: string; // URL for the elimination image
  isStunned?: boolean; // Optional stun state
  stunDuration?: number; // Optional stun duration
  isInvulnerable?: boolean; // Invulnerability state
  invulnerableDuration?: number; // Duration of invulnerability
  speedBoost?: number; // Speed boost effect
  speedBoostDuration?: number; // Speed boost duration
  shield?: number; // Shield absorbs state
  isPoisoned?: boolean; // Poison state
  poisonDamage?: number; // Poison damage per turn
  damageReduction?: number; // Damage reduction percentage
  damageReductionDuration?: number; // Duration of damage reduction
}

const Game = () => {
  const [teamA, setTeamA] = useState<Character[]>([]);
  const [teamB, setTeamB] = useState<Character[]>([]);
  const [actions, setActions] = useState<any>([]);
  const [currentTeam, setCurrentTeam] = useState('A');
  const [turnMessage, setTurnMessage] = useState("Team A's turn");
  const [isSimulating, setIsSimulating] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningTeam, setWinningTeam] = useState<string | null>(null);
  const [isAttacking, setisAttacking] = useState(false)

  useEffect(() => {
    setTeamA([Characters[0], Characters[1], Characters[2]]);
    setTeamB([Characters[3], Characters[4], Characters[0]]);
  }, []);

  const queueAction = (team: 'A' | 'B', action: any) => {
    if (!isSimulating) {
      setActions((prevActions: any) => [...prevActions, { team, ...action }]);
    }
  };

  const applyDamage = (character: Character, damage: number) => {
    character.health = Math.max(character.health - damage, 0);
  };

  const applyHealing = (character: Character, healing: number) => {
    character.health = Math.min(character.health + healing, character.maxHealth);
  };

  const applyStatusEffects = (character: Character) => {
    if (character.isPoisoned) {
      character.health = Math.max(character.health - 10, 0);
    }
    if (character.isStunned && character.stunDuration) {
      character.stunDuration -= 1;
      if (character.stunDuration <= 0) character.isStunned = false;
    }
    if (character.invulnerableDuration) {
      character.invulnerableDuration -= 1;
      if (character.invulnerableDuration <= 0) character.isInvulnerable = false;
    }
  };

  const allActionsQueuedForTeam = (team: any) => {
    const activeTeam = team === 'A' ? teamA : teamB;
    const activeCharactersCount = activeTeam.filter((char) => char.health > 0).length;
    return actions.filter((action: any) => action.team === team).length === activeCharactersCount;
  };

  useEffect(() => {
    if (actions.length > 0 && allActionsQueuedForTeam(currentTeam)) {
      if (currentTeam === 'A') {
        setTurnMessage("Team B's turn");
        setCurrentTeam('B');
      } else {
        simulate();
        setisAttacking(true)
        setTimeout(() => {
          setisAttacking(false)
        }, 3000)
      }
    }
  }, [actions, currentTeam]);

  const simulate = async () => {
    setIsSimulating(true);

    for (const action of actions) {
      const targetTeam = action.team === 'A' ? teamB : teamA;
      const attackingTeam = action.team === 'A' ? teamA : teamB;
      const attacker = attackingTeam[action.attackerIndex];
      const target = targetTeam[action.opponentIndex];
      const power = action.powerCost;
      const effect = action.effect;
      // Deduct mana for the attacking character
      attacker.mana = Math.max(attacker.mana - power, 0);
      console.log(action)
      console.log(attacker)
      // Handle each power effect based on its type
      if (action.rollDice == 1) {
        switch (effect.type) {
          case 'damage':
            applyDamage(target, effect.damage || 0);
            console.log(`${attacker.name} attacked ${target.name} dealing ${effect.damage} damage with a mana cost of ${power}.`);
            break;
          case 'heal':
            applyHealing(attacker, effect.healingAmount || 0);
            console.log(`${attacker.name} attacked ${target.name} dealing ${effect.healingAmount} Heal with a mana cost of ${power}.`);
            break;
          case 'damageAndStun':
            applyDamage(target, effect.damage || 0);
            target.isStunned = true;
            target.stunDuration = effect.stunDuration || 0;
            console.log(`${attacker.name} attacked ${target.name} dealing ${effect.damage} damage with a mana cost of ${power}.`);
            break;
          case 'invulnerability':
            attacker.isInvulnerable = true;
            attacker.invulnerableDuration = effect.duration || 0;

            break;
          case 'damageReduction':
            attacker.damageReduction = effect.damageReduction || 0;
            attacker.damageReductionDuration = effect.duration || 0;
            break;
          case 'speedBoost':
            attacker.speedBoost = effect.speedIncrease || 0;
            attacker.speedBoostDuration = effect.duration || 0;
            break;
          case 'shield':
            attacker.shield = effect.absorbs || 0;
            break;
          case 'aoeDamage':
            targetTeam.forEach((t) => {
              applyDamage(t, effect.damage || 0);
            });
            break;
          case 'multiDamage':
            for (let i = 0; i < (effect.targets || 1); i++) {
              applyDamage(targetTeam[i], effect.damage || 0);
            }
            break;
          }
        }
        else{
        console.log(`${attacker.name} miss the target`)
      }

      applyStatusEffects(target);
      applyStatusEffects(attacker);

    }

    checkForGameOver();
    setActions([]); // Clear actions after simulation
    setCurrentTeam('A');
    setTurnMessage("Team A's turn");
    setIsSimulating(false);
  };


  const checkForGameOver = () => {
    const teamAAlive = teamA.some((char) => char.health > 0);
    const teamBAlive = teamB.some((char) => char.health > 0);

    if (!teamAAlive || !teamBAlive) {
      setGameOver(true);
      setWinningTeam(teamAAlive ? 'A' : 'B');
    }
  };

  const handleAttack = (attackerIndex: number, opponentIndex: number, power: { cost: Number, effect: Effect }, rollDice: number, team: 'A' | 'B') => {
    if (!isSimulating && !gameOver) {
      console.log(teamA[attackerIndex])
      queueAction(team, {
        attackerIndex,
        opponentIndex,
        powerCost: power.cost,
        effect: power.effect,
        rollDice
      });
    }
  };

  return (
    <div>
      {gameOver ? (
        <div className="text-center">
          <h2>Game Over</h2>
          <p>Winning Team: {winningTeam}</p>
        </div>
      ) : (
        <div>
          <p>{turnMessage}</p>
          <div className="flex">
            <div className="w-1/2">
              {teamA.map((character, index) => (
                <Character
                  key={index}
                  num={index}
                  name={character.name}
                  health={character.health}
                  maxHealth={character.maxHealth}
                  mana={character.mana}
                  maxMana={character.maxMana}
                  powers={character.powers}
                  opponents={teamB.map((opponent) => ({ name: opponent.name, health: opponent.health }))}
                  imageUrl={character.imageUrl}
                  attackingImageUrl={character.attackingImageUrl}
                  powerImageUrl={character.powerImageUrl}
                  eliminationImageUrl={character.eliminationImageUrl}
                  eliminatedImageUrl={character.eliminatedImageUrl}
                  position="left"
                  canAttack={currentTeam === 'A' && !isSimulating}
                  onAttack={(opponentIndex, attackValue, power, rollDice) => handleAttack(index, opponentIndex, power, rollDice, 'A')}
                  isAttacking={isAttacking}
                />
              ))}
            </div>
            <div className="w-1/2">
              {teamB.map((character, index) => (
                <Character
                  key={index}
                  num={index}
                  name={character.name}
                  health={character.health}
                  maxHealth={character.maxHealth}
                  mana={character.mana}
                  maxMana={character.maxMana}
                  powers={character.powers}
                  opponents={teamA.map((opponent) => ({ name: opponent.name, health: opponent.health }))}
                  imageUrl={character.imageUrl}
                  attackingImageUrl={character.attackingImageUrl}
                  powerImageUrl={character.powerImageUrl}
                  eliminationImageUrl={character.eliminationImageUrl}
                  eliminatedImageUrl={character.eliminatedImageUrl}
                  position="right"
                  canAttack={currentTeam === 'B' && !isSimulating}
                  onAttack={(opponentIndex, attackValue, power, rollDice) => handleAttack(index, opponentIndex, power, rollDice, 'B')}
                  isAttacking={isAttacking}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
