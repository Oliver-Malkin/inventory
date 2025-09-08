import { prisma } from "@/lib/prisma";

export async function getUserByEmail(email: string) {
  return (prisma.user.findUnique({ where: { email } }))
}

export async function getUserByID(id: string) {
  return (prisma.user.findUnique({ where: { id } }))
}

export async function getComponentById(id: string) {
  return (prisma.component.findUnique({
    where: {
      id
    }
  }))
}

export async function getComponentsByPage(skip: number, take: number) {
  return (prisma.component.findMany({
    skip: skip,
    take: take,
    include: {
      category: true,
    }
  }))
}

export async function getComponentByName(name: string) {
  return (prisma.component.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    include: {
      category: true
    },
    orderBy: {
      name: "asc"
    }
  }))
}

export async function getCategoryLeaves() {
  return (prisma.category.findMany({
    where: {
      child: {
        none: {}
      }
    },
    orderBy: {
      name: "asc"
    }
  }))
}

export async function getCategoryByParentId(parentID: string | null) {
  return (prisma.category.findMany({
    where: {
      parentId: parentID
    },
    orderBy: {
      name: "asc"
    }
  }))
}

export async function createCategory({
  name,
  parentId
}: {
  name: string,
  parentId?: string
}) {
  await prisma.category.create({
    data: {
      name,
      parentId
    }
  })
}
