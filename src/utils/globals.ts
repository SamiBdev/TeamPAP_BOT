let autoDemuteIsActive: boolean = false;
export function setAutoDemute(isActive: boolean) {autoDemuteIsActive = isActive;}
export function getAutoDemute():boolean {return autoDemuteIsActive;}

let coolDownAutoDemute: number = 0;
export function setcoolDownAutoDemute(Time: number) {coolDownAutoDemute = Time;}
export function getcoolDownAutoDemute():number {return coolDownAutoDemute;}

export const coolDownAutoDemuteTime = 30; // Time in second