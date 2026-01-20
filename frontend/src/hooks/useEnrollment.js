import { useState } from "react";
import { registrationsService, profilesService } from "../services";

const useEnrollment = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: "",
        enrollment: "",
        branch: "",
        year: "",
        email: "",
        phone: "",
        transactionId: "",
        bringLaptop: "",
    });

    const resetForm = () => {
        setFormData({
            name: "",
            enrollment: "",
            branch: "",
            year: "",
            email: "",
            phone: "",
            transactionId: "",
            bringLaptop: "",
        });
        setErrors({});
        setSubmitStatus(null);
    };

    const validateForm = () => {
        const newErrors = {};
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.transactionId || formData.transactionId.trim().length < 10) {
            newErrors.transactionId = "Please enter a valid UPI Transaction ID (minimum 10 characters)";
        }
        if (!formData.bringLaptop) {
            newErrors.bringLaptop = "Please select whether you will bring a laptop";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const loadUserProfile = async (user) => {
        try {
            const profile = await profilesService.get(user.id);
            setFormData((prev) => ({
                ...prev,
                name: profile?.name || "",
                enrollment: profile?.enrollment || "",
                branch: profile?.branch || "",
                year: profile?.year || "",
                email: user.email || "",
                phone: profile?.phone || "",
            }));
            return profile;
        } catch (error) {
            console.error("Error loading profile:", error);
            return null;
        }
    };

    const submitEnrollment = async (user, event, userProfile, onSuccess) => {
        if (!validateForm()) return false;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            if (!event.id) throw new Error("Invalid event selected. Please refresh the page and try again.");
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(event.id)) throw new Error("Invalid event ID format. Please refresh the page.");

            const registrationData = {
                user_id: user.id,
                event_id: event.id,
                transaction_id: formData.transactionId,
                payment_method: "UPI",
                amount_paid: parseFloat(event.fee),
                enrollment_number: formData.enrollment,
                branch: formData.branch,
                year: formData.year,
                phone: formData.phone,
                email: formData.email || user.email,
                status: "pending",
                bring_laptop: formData.bringLaptop,
            };

            await registrationsService.create(registrationData);

            // Update profile if needed
            if (userProfile) {
                const profileUpdates = {};
                if (formData.name && formData.name !== userProfile.name) profileUpdates.name = formData.name;
                if (formData.enrollment && formData.enrollment !== userProfile.enrollment) profileUpdates.enrollment = formData.enrollment;
                if (formData.branch && formData.branch !== userProfile.branch) profileUpdates.branch = formData.branch;
                if (formData.year && formData.year !== userProfile.year) profileUpdates.year = formData.year;
                if (formData.phone && formData.phone !== userProfile.phone) profileUpdates.phone = formData.phone;
                if (Object.keys(profileUpdates).length > 0) {
                    await profilesService.update(user.id, profileUpdates);
                }
            }

            setIsSubmitting(false);
            setSubmitStatus("success");
            
            if (onSuccess) onSuccess(event.id);
            
            return true;
        } catch (error) {
            console.error("Error creating registration:", error);
            setIsSubmitting(false);
            setSubmitStatus("error");

            let errorMessage = "Failed to submit registration. Please try again.";
            if (error.message) errorMessage = error.message;
            else if (error.details) errorMessage = error.details;
            else if (error.hint) errorMessage = error.hint;
            if (error.code === "23503") errorMessage = "Invalid event. The event may not exist in the database.";
            else if (error.code === "23505") {
                errorMessage = "You are already registered for this event!";
                if (onSuccess) onSuccess(event.id);
            }
            setErrors({ submit: errorMessage });
            return false;
        }
    };

    return {
        formData,
        setFormData,
        errors,
        setErrors,
        isSubmitting,
        submitStatus,
        handleChange,
        resetForm,
        loadUserProfile,
        submitEnrollment,
    };
};

export default useEnrollment;