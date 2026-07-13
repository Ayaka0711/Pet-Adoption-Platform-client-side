import { useAuth } from "../context/AuthContext";

const SPECIES_OPTIONS = ["Dog", "Cat", "Bird", "Rabbit", "Fish", "Other"];

const PetForm = ({ initialData, onSubmit, submitting, submitLabel = "Add Pet" }) => {
  const { user } = useAuth();
  const d = initialData || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    onSubmit({
      name: form.name.value.trim(),
      species: form.species.value,
      breed: form.breed.value.trim(),
      age: Number(form.age.value),
      gender: form.gender.value,
      image: form.image.value.trim(),
      healthStatus: form.healthStatus.value.trim(),
      vaccinationStatus: form.vaccinationStatus.value,
      location: form.location.value.trim(),
      adoptionFee: Number(form.adoptionFee.value) || 0,
      description: form.description.value.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Pet Name</label>
          <input name="name" defaultValue={d.name} required className="input-field mt-1" placeholder="e.g. Bella" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Species</label>
          <select name="species" defaultValue={d.species || "Dog"} required className="input-field mt-1">
            {SPECIES_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Breed</label>
          <input name="breed" defaultValue={d.breed} required className="input-field mt-1" placeholder="e.g. Labrador" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Age (years)</label>
          <input name="age" type="number" min="0" step="0.5" defaultValue={d.age} required className="input-field mt-1" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Gender</label>
          <select name="gender" defaultValue={d.gender || "Male"} required className="input-field mt-1">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Vaccination Status</label>
          <select name="vaccinationStatus" defaultValue={d.vaccinationStatus || "Vaccinated"} required className="input-field mt-1">
            <option value="Vaccinated">Vaccinated</option>
            <option value="Not Vaccinated">Not Vaccinated</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Location</label>
          <input name="location" defaultValue={d.location} required className="input-field mt-1" placeholder="e.g. Dhaka" />
        </div>
        <div>
          <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Adoption Fee (৳)</label>
          <input name="adoptionFee" type="number" min="0" defaultValue={d.adoptionFee ?? 0} className="input-field mt-1" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Image URL</label>
        <input
          name="image"
          type="url"
          defaultValue={d.image}
          required
          className="input-field mt-1"
          placeholder="Paste an imgbb / postimage link"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Health Status</label>
        <input name="healthStatus" defaultValue={d.healthStatus} required className="input-field mt-1" placeholder="e.g. Healthy, no known issues" />
      </div>

      <div>
        <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Description</label>
        <textarea name="description" defaultValue={d.description} rows={4} required className="input-field mt-1" placeholder="Tell adopters about this pet's personality..." />
      </div>

      <div>
        <label className="text-sm font-medium text-charcoal/80 dark:text-paper/80">Owner Email</label>
        <input value={user?.email || ""} readOnly className="input-field mt-1 bg-ink/5 dark:bg-paper/5" />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default PetForm;
