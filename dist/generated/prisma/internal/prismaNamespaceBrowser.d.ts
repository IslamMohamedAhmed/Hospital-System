import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
export declare const ModelName: {
    readonly User: "User";
    readonly Doctor: "Doctor";
    readonly Patient: "Patient";
    readonly Appointment: "Appointment";
    readonly Department: "Department";
    readonly MedicalRecord: "MedicalRecord";
    readonly Prescription: "Prescription";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly role: "role";
    readonly isVerified: "isVerified";
    readonly PasswordChangedAt: "PasswordChangedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const DoctorScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly specialization: "specialization";
    readonly departmentId: "departmentId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum];
export declare const PatientScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly phone: "phone";
    readonly dateOfBirth: "dateOfBirth";
    readonly gender: "gender";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum];
export declare const AppointmentScalarFieldEnum: {
    readonly id: "id";
    readonly date: "date";
    readonly doctorId: "doctorId";
    readonly patientId: "patientId";
    readonly status: "status";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum];
export declare const DepartmentScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum];
export declare const MedicalRecordScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly diagnosis: "diagnosis";
    readonly treatment: "treatment";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MedicalRecordScalarFieldEnum = (typeof MedicalRecordScalarFieldEnum)[keyof typeof MedicalRecordScalarFieldEnum];
export declare const PrescriptionScalarFieldEnum: {
    readonly id: "id";
    readonly patientId: "patientId";
    readonly doctorId: "doctorId";
    readonly medication: "medication";
    readonly dosage: "dosage";
    readonly instructions: "instructions";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map