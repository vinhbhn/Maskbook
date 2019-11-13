import { ProfileIdentifier, PersonaIdentifier } from '../type'
import { Profile, Persona } from './types'
import {
    ProfileRecord,
    queryProfilesDB,
    PersonaRecord,
    queryProfileDB,
    queryPersonaDB,
    queryPersonasDB,
    PersonaDBAccess,
    detachProfileDB,
    deletePersonaDB,
    safeDeletePersonaDB,
    updateProfileDB,
    createProfileDB,
} from './Persona.db'
import { IdentifierMap } from '../IdentifierMap'
import { getAvatarDataURL } from '../helpers/avatar'

export async function profileRecordToProfile(record: ProfileRecord): Promise<Profile> {
    const rec = { ...record }
    const persona = rec.linkedPersona
    delete rec.linkedPersona
    delete rec.localKey
    const _ = persona ? queryPersona(persona) : undefined
    const _2 = getAvatarDataURL(rec.identifier)
    return {
        ...record,
        linkedPersona: await _,
        avatar: await _2,
    }
}
export function personaRecordToPersona(record: PersonaRecord): Persona {
    const rec = { ...record }
    delete rec.localKey
    delete rec.publicKey
    const hasPrivateKey = !!rec.privateKey
    delete rec.privateKey
    return {
        ...rec,
        hasPrivateKey,
        fingerprint: rec.identifier.compressedPoint,
    }
}

/**
 * Query a Profile even it is not stored in the database.
 * @param identifier - Identifier for people want to query
 */
export async function queryProfile(identifier: ProfileIdentifier): Promise<Profile> {
    const _ = await queryProfileDB(identifier)
    if (_) return profileRecordToProfile(_)
    return {
        identifier,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}

/**
 * Query a persona even it is not stored in the database.
 * @param identifier - Identifier for people want to query
 */
export async function queryPersona(identifier: PersonaIdentifier): Promise<Persona> {
    const _ = await queryPersonaDB(identifier)
    if (_) return personaRecordToPersona(_)
    return {
        identifier,
        createdAt: new Date(),
        updatedAt: new Date(),
        linkedProfiles: new IdentifierMap(new Map()),
        hasPrivateKey: false,
        fingerprint: identifier.compressedPoint,
    }
}

/**
 * Select a set of Profiles
 */
export async function queryProfilesWithQuery(query?: Parameters<typeof queryProfilesDB>[0]): Promise<Profile[]> {
    const _ = await queryProfilesDB(query || (_ => true))
    return Promise.all(_.map(profileRecordToProfile))
}

/**
 * Select a set of Profiles
 */
export async function queryPersonasWithQuery(query?: Parameters<typeof queryPersonasDB>[0]): Promise<Persona[]> {
    const _ = await queryPersonasDB(query || (_ => true))
    return _.map(personaRecordToPersona)
}

export async function deletePersona(id: PersonaIdentifier, confirm: 'delete even with private' | 'safe delete') {
    const t = (await PersonaDBAccess()).transaction(['profiles', 'personas'], 'readwrite')
    const d = await queryPersonaDB(id, t as any)
    if (!d) return
    for (const e of d.linkedProfiles) {
        await detachProfileDB(e[0], t as any)
    }
    if (confirm === 'delete even with private') await deletePersonaDB(id, 'delete even with private', t as any)
    else if (confirm === 'safe delete') await safeDeletePersonaDB(id, t as any)
}

export async function updateOrCreateProfile(rec: Pick<Profile, 'identifier'> & Partial<ProfileRecord>) {
    const t = (await PersonaDBAccess()).transaction('profiles', 'readwrite')
    const r = await queryProfileDB(rec.identifier, t)
    const e: ProfileRecord = {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...rec,
    }
    if (r) await updateProfileDB({ ...r, ...rec, updatedAt: new Date() }, t)
    else await createProfileDB(e, t)
}
