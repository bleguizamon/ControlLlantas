using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("ruta")]
    public class Ruta : BaseEntity<long>
    {
        public string NombreRuta { get; set; }
        public string CiudadInicio { get; set; }
        public string CiudadFin { get; set; }
        public int? Kilometraje { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var ruta = obj as Ruta;
            if (ruta?.Id == null || ruta?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, ruta.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Ruta{" +
                    $"ID='{Id}'" +
                    $", NombreRuta='{NombreRuta}'" +
                    $", CiudadInicio='{CiudadInicio}'" +
                    $", CiudadFin='{CiudadFin}'" +
                    $", Kilometraje='{Kilometraje}'" +
                    "}";
        }
    }
}
