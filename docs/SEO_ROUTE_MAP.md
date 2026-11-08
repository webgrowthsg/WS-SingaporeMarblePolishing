# SEO Route Map — Singapore Marble Polishing

All 12 canonical public HTML routes. No other public HTML routes exist.

| # | Path | Primary Keyword | Title Tag | H1 | Indexability |
|---|------|----------------|-----------|-----|--------------|
| 01 | `/` | marble polishing Singapore | Marble Polishing Singapore \| Residential & Commercial | Marble Polishing Services in Singapore | index |
| 02 | `/marble-restoration/` | marble restoration Singapore | Marble Restoration Singapore \| Treatment Options | Marble Restoration Services in Singapore | index |
| 03 | `/marble-grinding/` | marble grinding Singapore | Marble Grinding Singapore \| Surface Restoration | Marble Grinding in Singapore | index |
| 04 | `/marble-sealing/` | marble sealing Singapore | Marble Sealing Singapore \| Stone Protection | Marble Sealing in Singapore | index |
| 05 | `/hdb-marble-polishing/` | HDB marble floor polishing | HDB Marble Floor Polishing Singapore \| Quote | HDB Marble Floor Polishing | index |
| 06 | `/condo-marble-polishing/` | condo marble floor polishing | Condo Marble Floor Polishing Singapore \| Quote | Condominium Marble Floor Polishing | index |
| 07 | `/commercial-marble-polishing/` | commercial marble polishing Singapore | Commercial Marble Polishing Singapore \| Enquiries | Commercial Marble Polishing in Singapore | index |
| 08 | `/marble-polishing-cost-singapore/` | marble polishing cost Singapore | Marble Polishing Cost Singapore \| Pricing Factors | Marble Polishing Cost in Singapore | index |
| 09 | `/about-us/` | Singapore Marble Polishing about | About Us \| Singapore Marble Polishing | About Singapore Marble Polishing | index |
| 10 | `/request-a-quote/` | marble polishing quotation Singapore | Request a Marble Polishing Quote \| Singapore | Request a Marble Polishing Quotation | index |
| 11 | `/privacy-policy/` | privacy policy marble polishing Singapore | Privacy Policy \| Singapore Marble Polishing | Privacy Policy | index |
| 12 | `/terms-and-conditions/` | terms and conditions marble polishing Singapore | Terms and Conditions \| Singapore Marble Polishing | Terms and Conditions | index |

## H2 Headings per Route

### 01 `/` — Homepage
- Residential Marble Polishing
- Commercial Marble Polishing
- Marble Restoration Options
- How Enquiry Coordination Works
- Common Marble Problems
- Frequently Asked Questions
- Request a Quotation

### 02 `/marble-restoration/`
- When Marble Restoration May Be Needed
- Common Damage Types
- Grinding, Honing and Polishing Explained
- Sealing and Aftercare
- Assessment and Service Coordination
- Frequently Asked Questions
- Request a Quote

### 03 `/marble-grinding/`
- When Grinding May Be Appropriate
- When Grinding Is Not Appropriate
- Typical Assessment and Process
- Risks and Surface Limitations
- Grinding vs Honing and Polishing
- Frequently Asked Questions
- Request an Assessment

### 04 `/marble-sealing/`
- When Marble Sealing May Help
- What Sealing Does and Does Not Prevent
- Surface Preparation and Assessment
- Maintenance and Reapplication
- Related Marble Treatments
- Frequently Asked Questions
- Request an Assessment

### 05 `/hdb-marble-polishing/`
- Marble Issues in HDB Homes
- Suitable Treatment Options
- Home Access and Preparation
- What to Expect from an Assessment
- Related Restoration Services
- Frequently Asked Questions
- Request a Quote

### 06 `/condo-marble-polishing/`
- Marble Surfaces in Condominiums
- Common Wear and Finish Problems
- Treatment and Finish Options
- Management and Access Considerations
- Related Restoration Services
- Frequently Asked Questions
- Request a Quote

### 07 `/commercial-marble-polishing/`
- Commercial Marble Surface Challenges
- Relevant Building and Facility Types
- Restoration and Maintenance Options
- Access, Safety and Downtime Planning
- How Commercial Enquiries Are Assessed
- Frequently Asked Questions
- Request a Commercial Quote

### 08 `/marble-polishing-cost-singapore/`
- What Affects Marble Polishing Cost
- Polishing vs Restoration Pricing
- Area, Condition and Access Factors
- What a Written Quotation Should Include
- Frequently Asked Pricing Questions
- Request a Tailored Quote

### 09 `/about-us/`
- What This Website Does
- How Enquiries Are Coordinated
- Independent Service Partners
- Our Approach to Accurate Information
- Contact and Enquiries

### 10 `/request-a-quote/`
- Tell Us About Your Marble Surface
- What Happens After You Enquire
- Contact Options
- How Your Information Is Used

### 11 `/privacy-policy/`
- Who Handles Your Information
- What We Collect
- Why We Use and Share It
- Retention and Security
- Your Requests and Contact
- Updates to This Policy

### 12 `/terms-and-conditions/`
- Website and Enquiry Service
- Independent Service Providers
- Quotations and Service Arrangements
- Information and Limitations
- Contact and Updates

## Internal Link Graph

| Route | Contextual Links To |
|-------|-------------------|
| `/` | `/marble-restoration/`, `/hdb-marble-polishing/`, `/condo-marble-polishing/`, `/commercial-marble-polishing/`, `/marble-polishing-cost-singapore/`, `/request-a-quote/` |
| `/marble-restoration/` | `/marble-grinding/`, `/marble-sealing/`, `/marble-polishing-cost-singapore/`, `/request-a-quote/` |
| `/marble-grinding/` | `/marble-restoration/`, `/marble-sealing/`, `/request-a-quote/` |
| `/marble-sealing/` | `/marble-restoration/`, `/marble-grinding/`, `/request-a-quote/` |
| `/hdb-marble-polishing/` | `/marble-restoration/`, `/condo-marble-polishing/`, `/marble-polishing-cost-singapore/`, `/request-a-quote/` |
| `/condo-marble-polishing/` | `/marble-restoration/`, `/hdb-marble-polishing/`, `/marble-polishing-cost-singapore/`, `/request-a-quote/` |
| `/commercial-marble-polishing/` | `/marble-restoration/`, `/marble-polishing-cost-singapore/`, `/request-a-quote/` |
| `/marble-polishing-cost-singapore/` | `/hdb-marble-polishing/`, `/condo-marble-polishing/`, `/commercial-marble-polishing/`, `/request-a-quote/` |
| `/about-us/` | `/request-a-quote/` |
| `/request-a-quote/` | `/about-us/`, `/privacy-policy/` |
| `/privacy-policy/` | `/terms-and-conditions/`, `/request-a-quote/` |
| `/terms-and-conditions/` | `/privacy-policy/`, `/request-a-quote/` |

## Canonical Configuration

- Canonical origin: `https://singaporemarblepolishing.com` (provisional, via `PUBLIC_SITE_URL` env var)
- All canonicals are self-referencing absolute URLs with trailing slashes
- `/robots.txt` references the sitemap
- `/sitemap.xml` contains exactly 12 canonical routes
- No doorway pages, blog posts, city/district pages, or separate FAQ/project/contact pages

## Notes

- Domain ownership is **unverified**. The canonical origin is a build configuration default only.
- Staging must be nonindexable (noindex header or meta tag).
- For production SEO, the 12 routes must be prerendered/SSG to ensure crawler-accessible HTML.
