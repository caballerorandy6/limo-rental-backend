import prisma from "../utils/prisma";
import { Prisma, ContactStatus } from "@prisma/client";

export class ContactService {
  // Create Contact
  async createContact(data: Prisma.ContactCreateInput) {
    const newContact = await prisma.contact.create({
      data,
    });
    return newContact;
  }

  // Get All Contacts (Admin)
  async getAllContacts() {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return contacts;
  }

  // Get Contact By ID (Admin)
  async getContactById(id: string) {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    return contact;
  }

  // Update Contact Status (Admin) - Most common operation
  async updateContactStatus(id: string, status: ContactStatus) {
    const updatedContact = await prisma.contact.update({
      where: { id },
      data: { status },
    });
    return updatedContact;
  }

  // Update Contact (Admin) - Full update if needed
  async updateContact(id: string, data: Prisma.ContactUpdateInput) {
    const updatedContact = await prisma.contact.update({
      where: { id },
      data,
    });
    return updatedContact;
  }

  // Delete Contact By ID (Admin)
  async deleteContact(id: string) {
    const deletedContact = await prisma.contact.delete({
      where: { id },
    });
    return deletedContact;
  }
}

export default new ContactService();
