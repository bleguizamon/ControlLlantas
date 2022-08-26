using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("agenda")]
    public class Agenda : BaseEntity<long>
    {
        [Required]
        public DateTime FechaCita { get; set; }

        public long? VehiculoId { get; set; }
        public Vehiculo Vehiculo { get; set; }

        public long? ProveedorId { get; set; }
        public Proveedor Proveedor { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var agenda = obj as Agenda;
            if (agenda?.Id == null || agenda?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, agenda.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Agenda{" +
                    $"ID='{Id}'" +
                    $", FechaCita='{FechaCita}'" +
                    "}";
        }
    }
}
