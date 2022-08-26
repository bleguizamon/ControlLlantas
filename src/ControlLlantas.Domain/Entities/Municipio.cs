using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace And.ControlLlantas.Domain
{
    [Table("municipio")]
    public class Municipio : BaseEntity<long>
    {
        public int? Codigo { get; set; }
        public string Nombre { get; set; }

        public long? DepartamentoId { get; set; }
        public Departamento Departamento { get; set; }

        // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var municipio = obj as Municipio;
            if (municipio?.Id == null || municipio?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, municipio.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "Municipio{" +
                    $"ID='{Id}'" +
                    $", Codigo='{Codigo}'" +
                    $", Nombre='{Nombre}'" +
                    "}";
        }
    }
}
