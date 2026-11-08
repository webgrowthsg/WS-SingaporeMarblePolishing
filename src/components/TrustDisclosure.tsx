interface TrustDisclosureProps {
  variant?: "compact" | "full";
}

export function TrustDisclosure({ variant = "compact" }: TrustDisclosureProps) {
  if (variant === "full") {
    return (
      <div className="rounded-lg border border-stone-300 bg-stone-50 p-5 text-sm text-stone-600 leading-relaxed">
        <p>
          <strong className="text-stone-800">About this service:</strong>{" "}
          SingaporeMarblePolishing.com is a lead coordination website, not a
          registered marble polishing contractor. We collect your enquiry
          details and share them with independent service partners where
          available, so they can assess your marble surface and provide a
          quotation directly. We do not employ technicians, own equipment, or
          carry out polishing work ourselves. Any engagement, quotation, or
          service arrangement is between you and the service partner you
          choose.
        </p>
      </div>
    );
  }

  return (
    <p className="text-sm text-stone-500 italic">
      SingaporeMarblePolishing.com coordinates enquiries with independent
      service partners. We are not a registered contractor.
    </p>
  );
}
