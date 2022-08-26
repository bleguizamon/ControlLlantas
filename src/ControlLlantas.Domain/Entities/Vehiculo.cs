using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("vehiculo")]
    public class Vehiculo : BaseEntity<long>
    {
        [Required]
        public string NumPlaca { get; set; }
        public int? NumPasajeros { get; set; }
        public string Motor { get; set; }
        public string Modelo { get; set; }
        public string Marca { get; set; }
        public int? NumEjes { get; set; }
        public int? Kilometraje { get; set; }

        public long? ConductorId { get; set; }
        public Conductor Conductor { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var vehiculo = obj as Vehiculo;
            if (vehiculo?.Id == null || vehiculo?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, vehiculo.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Vehiculo{" +
                    $"ID='{Id}'" +
                    $", NumPlaca='{NumPlaca}'" +
                    $", NumPasajeros='{NumPasajeros}'" +
                    $", Motor='{Motor}'" +
                    $", Modelo='{Modelo}'" +
                    $", Marca='{Marca}'" +
                    $", NumEjes='{NumEjes}'" +
                    $", Kilometraje='{Kilometraje}'" +
                    "}";
        }
    }
}
