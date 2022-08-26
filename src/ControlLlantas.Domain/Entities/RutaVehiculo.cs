using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("ruta_vehiculo")]
    public class RutaVehiculo : BaseEntity<long>
    {
        public DateTime Feha { get; set; }

        public long? VehiculoId { get; set; }
        public Vehiculo Vehiculo { get; set; }

        public long? RutaId { get; set; }
        public Ruta Ruta { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var rutaVehiculo = obj as RutaVehiculo;
            if (rutaVehiculo?.Id == null || rutaVehiculo?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, rutaVehiculo.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "RutaVehiculo{" +
                    $"ID='{Id}'" +
                    $", Feha='{Feha}'" +
                    "}";
        }
    }
}
