using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("proveedor")]
    public class Proveedor : BaseEntity<long>
    {
        public string Nit { get; set; }
        public string RazonSocial { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string HorarioLaboral { get; set; }

        public long? MunicipioId { get; set; }
        public Municipio Municipio { get; set; }

        public long? DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var proveedor = obj as Proveedor;
            if (proveedor?.Id == null || proveedor?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, proveedor.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Proveedor{" +
                    $"ID='{Id}'" +
                    $", Nit='{Nit}'" +
                    $", RazonSocial='{RazonSocial}'" +
                    $", Direccion='{Direccion}'" +
                    $", Telefono='{Telefono}'" +
                    $", HorarioLaboral='{HorarioLaboral}'" +
                    "}";
        }
    }
}
