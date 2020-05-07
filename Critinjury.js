/* jshint undef: true */
/* globals
 sendChat,
 randomInteger,
 _,
 on
 */

var Injury = (function()
{
	'use strict';

	const InjuryHit =
	[
		{low: 1,  high: 1,  result: "Death", Injury: "Crushed Skull/Decapitation", Duration: "Forever", Cure: "None",},
		{low: 2,  high: 2,  result: "Facial Scarring", Injury: "Lose an eye", Effect: "Disadvantage on perception checks involving sight and ranged attack rolls.", Duration: "Forever", Cure: "Regenerate",},
		{low: 3,  high: 3,  result: "Facial Scarring", Injury: "Lose nose", Effect: "Disadvantage on appropriate Charisma checks and perception checks involving smell.", Duration: "Forever", Cure: "Regenerate",},
		{low: 4,  high: 4,  result: "Facial Scarring", Injury: "Lose Ear", Effect: "Disadvantage on appropriate Charisma checks and perception checks involving hearing.", Duration: "Forever", Cure: "Regenerate",},
		{low: 5,  high: 5,  result: "Facial Scarring", Injury: "Lose teeth", Effect: "Disadvantage on appropriate Charisma checks.", Duration: "Forever", Cure: "Regenerate",},
		{low: 6,  high: 6,  result: "Lose a limb", Injury: "Lose an arm", Effect: "Can only use one arm to use an item/weapon", Duration: "Forever", Cure: "Prosthetic or Regenerate",},
		{low: 7,  high: 7,  result: "Lose a limb", Injury: "Lose a leg", Effect: "Moving more than 10ft requires a DC15 acrobatics check or fall prone", Duration: "Forever", Cure: "Prosthetic or Regenerate",},
		{low: 8,  high: 8,  result: "Lose a limb", Injury: "Lose a hand", Effect: "Cannot use two handed melee weapons or bows.", Duration: "Forever", Cure: "Prosthetic or Regenerate",},
		{low: 9,  high: 9,  result: "Lose a limb", Injury: "Lose a foot", Effect: "Walking speed is halved", Duration: "Forever", Cure: "Prosthetic or Regenerate",},
		{low: 10,  high: 10,  result: "Quicker Death", Injury: "Ending your misery+", Effect: "All enemies within 10ft make a DC10 WIS save. On a fail, they take pity and want to put you out of your misery.", Duration: "Until conscious", Cure: "N/A",},
		{low: 11,  high: 11,  result: "Quicker Death", Injury: "Ending your misery", Effect: "Your attacker makes a DC10 WIS save. On a fail, they take pity and want to put you out of your misery.", Duration: "Until conscious", Cure: "N/A",},
		{low: 12,  high: 12,  result: "Quicker Death", Injury: "Ruptured aorta", Effect: "Disadvantage on death saving throws and instantly suffer one failed death save", Duration: "Until stable", Cure: "DC 25 Medicine",},
		{low: 13,  high: 13,  result: "Quicker Death", Injury: "Arm artery cut", Effect: "Disadvantage on death saving throws.", Duration: "Until stable", Cure: "DC 20 Medicine",},
		{low: 14,  high: 14,  result: "Quicker Death", Injury: "Leg artery cut", Effect: "Instantly suffer one failed death save.", Duration: "Until stable", Cure: "Instant",},
		{low: 15,  high: 15,  result: "Severe Injury", Injury: "Broken spine", Effect: "The target is 2d8 weeksly incapacitated as they are unable to use muscles below the neck", Duration: "2d8 weeks", Cure: "Greater Restoration or 6th level Heal",},
		{low: 16,  high: 16,  result: "Severe Injury", Injury: "Severed muscles", Effect: "Disadvantage on all strength based checks and attacks", Duration: "2d8 weeks", Cure: "5th level healing spell",},
		{low: 17,  high: 17,  result: "Severe Injury", Injury: "Severed tendons", Effect: "Disadvantage on all dexterity based checks and attacks.", Duration: "2d8 weeks", Cure: "5th level healing spell",},
		{low: 18,  high: 18,  result: "Severe Injury", Injury: "Broken arm", Effect: "Can only use one arm to use an item/weapon", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 19,  high: 19,  result: "Severe Injury", Injury: "Broken Leg", Effect: "Moving more than 10ft per round requires a DC15 acrobatics check or fall prone.", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 20,  high: 20,  result: "Severe Injury", Injury: "Internal bleeding", Effect: "Every hour, remove 1HP from your hit point maximum", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 21,  high: 21,  result: "Severe Injury", Injury: "Punctured lung", Effect: "Gain one level of exhaustion. Completing a long rest does not remove this status until 2d8 weeks have passed", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 22,  high: 22,  result: "Severe Injury", Injury: "Broken rib", Effect: "Start of every turn DC15 CON save. On failure, you can take an action or a bonus action on your turns but not both.", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 23,  high: 23,  result: "Severe Injury", Injury: "Fractured Spine", Effect: "The target is permanently incapacitated as they are unable to use muscles below the neck.", Duration: "2d8 weeks", Cure: "Lesser restoration or 4th level healing spell",},
		{low: 24,  high: 24,  result: "Severe Injury", Injury: "Busted kidney", Effect: "Whenever an action is performed, make a DC15 CON save. On a failure, fall prone.", Duration: "2d8 weeks", Cure: "4th level healing spell",},
		{low: 25,  high: 25,  result: "Major Injury", Injury: "Severe concussion", Effect: "Disadvantage on concentration checks. Maintaining a spell requires a DC10 concentration check at the end of each of your turns", Duration: "2d6 days", Cure: "4th level healing spell",},
		{low: 26,  high: 26,  result: "Major Injury", Injury: "Crushed trachea", Effect: "Cannot speak", Duration: "2d6 days", Cure: "Lesser restoration or 3rd level healing spell",},
		{low: 27,  high: 27,  result: "Major Injury", Injury: "Ruptured Liver", Effect: "Poisoned status", Duration: "2d6 days", Cure: "Lesser restoration or 3rd level healing spell",},
		{low: 28,  high: 28,  result: "Major Injury", Injury: "Busted kneecap", Effect: "Movement speed is halved. Jumping or using the Dash action requires a DC15 CON save or fall prone.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 29,  high: 29,  result: "Major Injury", Injury: "Major Concussion", Effect: "Maintaining a spell requires a DC10 concentration check at the end of each of your turns", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 30,  high: 30,  result: "Major Injury", Injury: "Overstretched Muscle", Effect: "Disadvantage on all strength based checks and attacks.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 31,  high: 31,  result: "Major Injury", Injury: "Overstretched tendon", Effect: "Disadvantage on all dexterity based checks and attacks.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 32,  high: 32,  result: "Major Injury", Injury: "Fractured hand", Effect: "Cannot use two handed melee weapons or bows.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 33,  high: 33,  result: "Major Injury", Injury: "Fractured foot", Effect: "Movement speed is halved.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 34,  high: 34,  result: "Major Injury", Injury: "Ruptured intestines", Effect: "Preforming the attack or dash action incurs 1d6 slashing damage.", Duration: "2d6 days", Cure: "3rd level healing spell",},
		{low: 35,  high: 35,  result: "Injury", Injury: "Mild concussion", Effect: "Disadvantage on all perception checks", Duration: "1d4 days", Cure: "3rd level healing spell",},
		{low: 36,  high: 36,  result: "Injury", Injury: "Minor concussion", Effect: "Disadvantage on all concentration checks.", Duration: "1d4 days", Cure: "2nd level healing spell",},
		{low: 37,  high: 37,  result: "Injury", Injury: "Broken Nose", Effect: "Disadvantage on perception checks involving smell.", Duration: "1d4 days", Cure: "2nd level healing spell",},
		{low: 38,  high: 38,  result: "Injury", Injury: "Bleeding gut", Effect: "Whenever an attack is performed, make a DC10 CON save. On a failure, fall unconcious.", Duration: "1d4 days", Cure: "2nd level healing spell",},
		{low: 39,  high: 39,  result: "Injury", Injury: "Bruised kidney", Effect: "Whenever an attack is performed make a DC10 CON save. On a failure, fall prone.", Duration: "1d4 days", Cure: "2nd level healing spell",},
		{low: 40,  high: 40,  result: "Injury", Injury: "Trapped spinal nerve", Effect: "Paralysed status", Duration: "1d4 days", Cure: "2nd level healing spell",},
		{low: 41,  high: 41,  result: "Injury", Injury: "Bruised liver", Effect: "Poisoned status", Duration: "Long rest", Cure: "Lesser restoration or 3rd level healing",},
		{low: 42,  high: 42,  result: "Injury", Injury: "Blurred vision", Effect: "Your are blinded", Duration: "Long rest", Cure: "Lesser restoration",},
		{low: 43,  high: 43,  result: "Injury", Injury: "Deafness", Effect: "You are deafened", Duration: "Long rest", Cure: "Lesser restoration",},
		{low: 44,  high: 44,  result: "Injury", Injury: "Bruised rib", Effect:"When you take a reaction, first make a DC10 CON save. On a failure, you waste your reaction.", Duration: "Long rest", Cure: "Magical healing",},
		{low: 45,  high: 45,  result: "Injury", Injury: "Open wound", Effect: "If you move during your turn, you incur 1d6 slashing damage", Duration: "Long rest", Cure: "DC15 medicine check or healing",},
		{low: 46,  high: 46,  result: "Injury", Injury: "Sprained wrist", Effect: "You must make a DC10 CON save when casting a spell with a somatic component. On a fail, you fail to cast the spell", Duration: "Long rest", Cure: "Magical healing",},
		{low: 47,  high: 47,  result: "Injury", Injury: "Sprained ankle", Effect: "Movement speed is halved. When using the Dash action, make a DC15 Acrobatics check. On a failure, you fall prone", Duration: "Long rest", Cure: "Magical healing",},
		{low: 48,  high: 48,  result: "Injury", Injury: "Pulled bicep", Effect: "You have disadvantage on all contested grapple checks", Duration: "Long rest", Cure: "Magical healing",},
		{low: 49,  high: 49,  result: "Injury", Injury: "Pulled thigh", Effect: "You have disadvantage on all saving throws that resist being knocked prone. Being moved against your will imposes such a save", Duration: "Long rest", Cure: "Magical healing",},
		{low: 50,  high: 50,  result: "Severe mental trauma", Injury: "New phobia", Effect: "You must make a DC10 WIS check if encountering a similar foe in the future. On a failure you are frightened", Duration: "Long rest", Cure: "DC25 Medicine check",},
		{low: 51,  high: 51,  result: "Severe mental trauma", Injury: "Depression", Effect: "Disadvantage on Wisdom saving throws", Duration: "Until cured", Cure: "DC20 Medicine check",},
		{low: 52,  high: 52,  result: "Severe mental trauma", Injury: "Insomnia", Effect: "You must make a DC15 Intelligence save before every Long Rest. On a failure, you gain one exhaustion at the end of the rest.", Duration: "Until cured", Cure: "DC20 Medicine check",},
		{low: 53,  high: 53,  result: "Severe mental trauma", Injury: "Nightmares", Effect: "You must make a DC 12 Intelligence save before every Long Rest. On a failure, you gain one exhaustion at the end of the rest", Duration: "Until cured", Cure: "DC20 Medicine check",},
		{low: 54,  high: 54,  result: "Severe mental trauma", Injury: "Alcoholism", Effect: "Add it to your flaws.", Duration: "Until cured", Cure: "DC20 Medicine check",},
		{low: 55,  high: 55,  result: "Mental trauma", Injury: "Amnesia", Effect: "You will not remember anything that happened during combat once out of initiative.", Duration: "Until cured", Cure: "None",},
		{low: 56,  high: 56,  result: "Mental trauma", Injury: "Catatonic", Effect: "Your movement speed is zero and cannot take any actions or reactions other than a DC15 Medicine check on yourself.", Duration: "Forever", Cure: "DC15 Medicine check",},
		{low: 57,  high: 57,  result: "Mental trauma", Injury: "Seek cover", Effect: "You must make a DC15 WIS save. On a fail, you are frightened of all enemies until you are in full cover", Duration: "Until short rest", Cure: "None",},
		{low: 58,  high: 58,  result: "Mental trauma", Injury: "Mental Break", Effect: "Disadvantage on Wisdom saving throws.", Duration: "Until short rest", Cure: "None",},
		{low: 59,  high: 59,  result: "Mental trauma", Injury: "Uncontrollable tremble", Effect: "Disadvantage on Dexterity skill checks.", Duration: "Until short rest", Cure: "None",},
		{low: 60,  high: 60,  result: "Mental trauma", Injury: "Nervous twitch", Effect: "At the end of your turn make a DC12 STR save. On a fail, you drop an item in your hand.", Duration: "Until short rest", Cure: "None",},
		{low: 61,  high: 61,  result: "Mental trauma", Injury: "Freeze", Effect: "You must make a DC15 WIS at the start of your turns. On a failure, your movement speed is 0", Duration: "Until short rest", Cure: "None",},
		{low: 62,  high: 62,  result: "Mental trauma", Injury: "Berserk", Effect: "You must make a DC12 WIS at the start of your turns. On a failure, you attack the nearest creature in range.", Duration: "Until short rest", Cure: "None",},
		{low: 63,  high: 63,  result: "Mental trauma", Injury: "Flee", Effect: "You must make a DC15 WIS save. On a fail, you must use all your movement and the dash action to move away from the fight.", Duration: "Until short rest", Cure: "None",},
		{low: 64,  high: 64,  result: "Mental trauma", Injury: "Paranoia", Effect: "You must make a DC12 WIS save. On a failure, you must attack the nearest creature in range.", Duration: "1 round", Cure: "None",},
		{low: 65,  high: 65,  result: "Minor injury", Injury: "Pulled Calf", Effect: "Movement speed is reduced by 10ft.", Duration: "1 round", Cure: "Magical healing",},
		{low: 66,  high: 66,  result: "Minor injury", Injury: "Limp", Effect: "Movement speed is reduced 5ft.", Duration: "1 minute", Cure: "Magical healing",},
		{low: 67,  high: 67,  result: "Minor injury", Injury: "Ringing in ears", Effect: "Disadvantage on perception checks involving hearing.", Duration: "1 minute", Cure: "Magical healing",},
		{low: 68,  high: 68,  result: "Minor injury", Injury: "Bitten tongue", Effect: "Cannot speak", Duration: "1 minute", Cure: "Magical healing",},
		{low: 69,  high: 69,  result: "Minor injury", Injury: "Crotch hit", Effect: "When conscious, make a DC15 CON save at the start of each turn. On a failure, your movement speed is reduced to 0", Duration: "1 minute", Cure: "Special",},
		{low: 70,  high: 70,  result: "Minor injury", Injury: "Painful scar", Effect: "When you take a reaction, make a DC10 CON save, Onb a failure, you waste your reaction.", Duration: "1 minute", Cure: "Magical healing",},
		{low: 71,  high: 71,  result: "Minor injury", Injury: "Headache", Effect: "You have disadvantage on checks made to keep concentration on spells.", Duration: "1 minute", Cure: "Magical healing",},
		{low: 72,  high: 72,  result: "Minor injury", Injury: "Dislocated shoulder", Effect: "Incur a -2 modifier to all attack rolls.", Duration: "1 minute", Cure: "DC15 Medicine check or healing",},
		{low: 73,  high: 73,  result: "Minor injury", Injury: "Dislocated finger", Effect: "Incur a -1 modifier to all attack rolls.", Duration: "Until cured", Cure: "DC10 Medicine check or healing",},
		{low: 74,  high: 74,  result: "Minor injury", Injury: "Blood in eyes", Effect: "You have disadvantage on perception checks made with sight and range attack rolls.", Duration: "Until cured", Cure: "DC5 Medicine check or healing",},
		{low: 75,  high: 75,  result: "Flavour effect", Injury: "Shredded clothing", Effect: "No other effects", Duration: "Until cured", Cure: " ",},
		{low: 76,  high: 76,  result: "Flavour effect", Injury: "Hair cut", Effect: "No other effects.", Duration: "Instant", Cure: " ",},
		{low: 77,  high: 77,  result: "Flavour effect", Injury: "Minor scar on body", Effect: "Something to show off... If you make it out alive.", Duration: "Instant", Cure: " ",},
		{low: 78,  high: 78,  result: "Flavour effect", Injury: "Monor scar on armor", Effect: "Something to show off... If you make it out alive", Duration: "Instant", Cure: " ",},
		{low: 79,  high: 79,  result: "Special effect", Injury: "Convienent fall", Effect: "Your body conveniently falls atop most of valuables. A DC15 sleight of hand check is required to loot you whilst unconcious", Duration: "Instant", Cure: " ",},
		{low: 80,  high: 80,  result: "Special effect", Injury: "Break item", Effect: "A random potion or non-magical item in your inventory breaks.", Duration: "Until concious", Cure: " ",},
		{low: 81,  high: 81,  result: "Special effect", Injury: "Activate magic item", Effect: "Actiavate a random magic item that you are either attuned to or have in your inventory.", Duration: "instant", Cure: " ",},
		{low: 82,  high: 82,  result: "Special effect", Injury: "Muscle memory", Effect: "Whilst you are unconcious, an ally can feed you a potion as bonus action instead of an action.", Duration: "instant", Cure: " ",},
		{low: 83,  high: 83,  result: "Special effect", Injury: "Reactive armour", Effect: "If you are wearing armour, the attacker takes 1d8 piercing damage as a result of attacking you.", Duration: "Until short/long rest", Cure: " ",},
		{low: 84,  high: 84,  result: "Special effect", Injury: "Death grip", Effect: "Make a grapple check contested with your attacker. On a success they are knocked prone next to you.", Duration: "Until short/long rest", Cure: " ",},
		{low: 85,  high: 85,  result: "Minor boon", Injury: "Remember me?", Effect: "You have advantage on the next attack roll against the creature that just incapacitated you.", Duration: "Until short/long rest", Cure: " ",},
		{low: 86,  high: 86,  result: "Minor boon", Injury: "I thought you were dead", Effect: "The creature that just incapacitated you will have disadvantage on their next attack roll against you.", Duration: "Until short/long rest", Cure: " ",},
		{low: 87,  high: 87,  result: "Minor boon", Injury: "Confident comeback", Effect: "The next attack against you have disadvantage", Duration: "Until short/long rest", Cure: " ",},
		{low: 88,  high: 88,  result: "Minor boon", Injury: "Dead-eye", Effect: "You have advantage on your next attack roll", Duration: "Forever", Cure: " ",},
		{low: 89,  high: 89,  result: "Minor boon", Injury: "Ready for round two", Effect : "You have advantage on your next saving throw",  Duration: "Forever", Cure: " ",},
		{low: 90,  high: 90,  result: "Memorable Scars", Injury: "Memorable scar on body", Effect: "Advantage on appropriate Intimidation checks.", Duration: "Forever", Cure: " ",},
		{low: 91,  high: 91,  result: "Memorable Scars", Injury: "Impressive scar on body", Effect: "Advantage on appropriate Intimidation checks and persuasion checks.", Duration: "Until concious", Cure: " ",},
		{low: 92,  high: 92,  result: "Memorable Scars", Injury: "Impressive scar on armour", Effect: "Advantage on appropriate Intimidation checks and persuasion checks.", Duration: "Until concious", Cure: " ",},
		{low: 93,  high: 93,  result: "Survivability", Injury: "Exaggerated Wound", Effect: "Your attacker assumes the worst for you. They will not attack you whilst you are incapacitated.", Duration: "Until stable/concious", Cure: " ",},
		{low: 94,  high: 94,  result: "Survivability", Injury: "Exaggerated Wound+", Effect: "Enemies assume the worst for you. They will not attack you whilst you are incapacitated.", Duration: "Until stable/concious", Cure: " ",},
		{low: 95,  high: 95,  result: "Survivability", Injury: "Second wind -", Effect: "Start with one successful death save.", Duration: "Until stable/concious", Cure: " ",},
		{low: 96,  high: 96,  result: "Survivability", Injury: "Second wind", Effect: "Advantage on death saving throws.", Duration: "Until stable", Cure: " ",},
		{low: 97,  high: 97,  result: "Survivability", Injury: "Second wind +", Effect: "Advantage on death saving throws and start with one successful death save.", Duration: "Instant", Cure: " ",},
		{low: 98,  high: 98,  result: "Survivability +", Injury: "Unexpected KO", Effect: "You will be stabilised after one successful death save.", Duration: "Instant", Cure: " ",},
		{low: 99,  high: 99,  result: "Survivability +", Injury: "Unexpected KO +", Effect: "You are instantly stabilised", Duration: "Instant", Cure: " ",},
		{low: 100,  high: 100,  result: "Resist Death", Injury: "Adrenaline Rush", Effect: "At the start of your turn, you regain health equal to 1 hit dice + CON modifier", Duration: "Instant", Cure: " ",},

	];

	function registerEventHandlers()
	{
		on('chat:message', Injury.handleChatMessage);
	}

	/**
	 * Grab chat message objects
	 *
	 * @param {object} msg
	 */
	function handleChatMessage(msg)
	{

		// Check if we are dealing with a !injury command.
		if (msg.type === "api" && msg.content.indexOf("!injury") !== -1)
		{
			var content = msg.content;
			var words = content.split(' ');

			// Sanity check
			if (words.length > 0)
			{
				// Sanity check
				if (words[0] === '!injury')
				{
					var rolled = 0;

					// Was a roll amount given? If so parse the second "word" as an int, otherwise create a randomInteger.
					if (words.length === 2)
					{
						rolled = parseInt(words[1]);
					}
					else
					{
						rolled = randomInteger(100);
					}

					// Sanity check
					if (typeof rolled !== 'number' || rolled === 0)
					{
						rolled = randomInteger(100);
					}

					// Get the smack object as a smash variable
					var smash = Injury._determineInjury(rolled);

					// Sanity check
					if (smash)
					{
						// Send the Injury result as a formatted string in chat
						sendChat('Critical Injury', rolled.toString() + "% <b>" + smash.result + "</b><br><i><b>Injury Type: </b>" + smash.Injury + "</b><br><i><b>Effect: </b>" + smash.Effect +  '</i><br><i><b>Cure: </b>' + smash.Cure + '</i><br><i><b>Duration: </b>' + smash.Duration + '</i>');
					}
					else
					{
						sendChat('Critical Injury', 'Invalid % roll given, or something went wrong. GM makes something up.');
					}
				}
			}
		}
	}

	/**
	 * Internal function given the roll value returns the object indicating the result and effect.
	 *
	 * @param {int} roll
	 * @return {object} smack
	 * @private
	 */
	function _determineInjury(roll)
	{
		// Use _.find to figure out what happened.
		return _.find(InjuryHit, function (hit)
		{
			return (roll >= hit.low && roll <= hit.high);
		});
	}

	return {
		registerEventHandlers: registerEventHandlers,
		handleChatMessage: handleChatMessage,
		_determineInjury: _determineInjury
		}
}());

/**
 * Fires when the page has loaded.
 */
on("ready", function()
{
	Injury.registerEventHandlers();
});
