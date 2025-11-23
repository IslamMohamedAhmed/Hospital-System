import { PrismaClient } from "../../generated/prisma/client.js";

const getPrisma = new PrismaClient();

const AppointmentStatus = {
    SCHEDULED: "SCHEDULED",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
}

const Role = {
    DOCTOR: "DOCTOR",
    NURSE: "NURSE",
    RECEPTIONIST: "RECEPTIONIST"
}

const Gender = {
    MALE: "MALE",
    FEMALE: "FEMALE"
}

export {
    getPrisma,
    AppointmentStatus,
    Role,
    Gender
}


