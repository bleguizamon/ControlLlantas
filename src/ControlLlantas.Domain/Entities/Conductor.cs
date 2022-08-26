using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("conductor")]
    public class Conductor : BaseEntity<long>
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string NumDocumento { get; set; }
        public string TipoDocumento { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var conductor = obj as Conductor;
            if (conductor?.Id == null || conductor?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, conductor.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Conductor{" +
                    $"ID='{Id}'" +
                    $", Nombre='{Nombre}'" +
                    $", Apellido='{Apellido}'" +
                    $", NumDocumento='{NumDocumento}'" +
                    $", TipoDocumento='{TipoDocumento}'" +
                    $", Email='{Email}'" +
                    $", Telefono='{Telefono}'" +
                    "}";
        }
    }
}
