import { NextFunction, Request, Response } from "express";
import { LocationService } from "../services/location-service";
import { CreateLocationRequest } from "../models/location-model";

export class LocationController {
    static async createLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { nama, isFilled } = req.body;

        try {

            const location = await LocationService.createLocation({
                nama,
                isFilled,
            });

            res.status(201).json(location);
        } catch (error) {
            next(error)
        }
    }

    static async createLocationsBatch(req: Request, res: Response, next: NextFunction): Promise<void> {
        const locationsData: CreateLocationRequest[] = req.body;

        try {
            const locations = await LocationService.createLocationsBatch(locationsData);
            res.status(201).json(locations);
        } catch (error) {
            next(error);
        }
    }

    static async getAllLocations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const locations = await LocationService.getAllLocations(); 
            res.status(200).json(locations); 
        } catch (error) {
            next(error)
        }
    }

    static async getLocationById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.id, 10);

        try {
            const location = await LocationService.getLocationById(id);
            if (location) {
                res.status(200).json(location); 
            } else {
                res.status(404).json({ error: "Location not found" }); 
            }
        } catch (error) {
            next(error)
        }
    }

    static async updateLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { locationId } = req.params;
        const { nama, isFilled } = req.body;
        const id = parseInt(locationId, 10);

        try {
            const updatedLocation = await LocationService.updateLocation(id, { nama, isFilled });
            if (updatedLocation) {
                res.status(200).json(updatedLocation); 
            } else {
                res.status(404).json({ error: "Location not found" }); 
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.id, 10);

        try {
            const success = await LocationService.deleteLocation(id);
            if (success) {
                res.status(200).json({ message: "Location deleted successfully" }); 
            } else {
                res.status(404).json({ error: "Location not found" }); 
            }
        } catch (error) {
            next(error)
        }
    }

    static async getIdByLocation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { nama } = req.body; 
    
        try {
            if (!nama || typeof nama !== "string") {
                res.status(400).json({ error: "Nama is required and should be a string" });
                return; 
            }
    
            const locationDetails = await LocationService.getIdByLocation(nama);

            res.status(200).json(locationDetails); 
        } catch (error) {
            next(error);
        }
    }
}
