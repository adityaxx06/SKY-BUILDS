import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ServiceItem } from "@/components/services/ServiceItem";
import { services } from "@/features/services/service-data";

export function Services() {
  return (
    <Container as="section" id="services" className="py-24">
      <Reveal>
        <p className="mb-5 text-[0.8125rem] font-medium" style={{ color: "var(--text-muted)" }}>
          Services
        </p>
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
