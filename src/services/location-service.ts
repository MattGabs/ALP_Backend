import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateLocationRequest, LocationResponse, toLocationResponse } from "../models/location-model";

export class LocationService {
    static async createLocation(request: CreateLocationRequest): Promise<LocationResponse> {
        if (!request.nama || request.isFilled === undefined) {
            throw new ResponseError(400, "All fields are required.");
        }

        const location = await prismaClient.location.create({
            data: {
                nama: request.nama,
                isFilled: request.isFilled,
            },
        });

        return toLocationResponse(location);
    }

    static async createLocationsBatch(requests: CreateLocationRequest[]): Promise<LocationResponse[]> {
        if (requests.length === 0) {
            throw new ResponseError(400, "At least one location is required.");
        }

        // Validate each location in the batch
        requests.forEach(req => {
            if (!req.nama || req.isFilled === undefined) {
                throw new ResponseError(400, "All fields are required for each location.");
            }
        });

        const locations = await prismaClient.location.createMany({
            data: requests,
        });

        // Returning the newly created locations
        return requests.map(toLocationResponse);
    }

    static async getAllLocations(): Promise<LocationResponse[]> {
        const locations = await prismaClient.location.findMany({
            orderBy: { id: "desc" }, 
        });

        return locations.map(toLocationResponse);
    }

    static async getLocationById(id: number): Promise<LocationResponse | null> {
        const location = await prismaClient.location.findUnique({
            where: { id },
        });

        return location ? toLocationResponse(location) : null;
    }

    static async updateLocation(id: number, request: CreateLocationRequest): Promise<LocationResponse | null> {
        const location = await prismaClient.location.findUnique({
            where: { id },
        });

        if (!location) {
            throw new ResponseError(404, "Location not found.");
        }

        const updatedLocation = await prismaClient.location.update({
            where: { id },
            data: {
                nama: request.nama,
                isFilled: request.isFilled,
            },
        });

        return toLocationResponse(updatedLocation);
    }

    static async deleteLocation(id: number): Promise<boolean> {
        const location = await prismaClient.location.findUnique({
            where: { id },
        });

        if (!location) {
            throw new ResponseError(404, "Location not found.");
        }

        await prismaClient.location.delete({
            where: { id },
        });

        return true;
    }

    static async getIdByLocation(nama: string): Promise<LocationResponse[]> {
        if (!nama) {
            throw new ResponseError(400, "Nama is required.");
        }
    
        const locations = await prismaClient.location.findMany({
            where: { nama },
            select: { id: true, nama: true, isFilled: true }, 
        });
    
        return locations.map(toLocationResponse);
    }
}
