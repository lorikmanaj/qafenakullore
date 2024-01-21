using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dtos.Slider
{
    public class SliderCreateRequest
    {
        public string Title { get; set; }
        public List<int> ProductIds { get; set; }
    }
}
