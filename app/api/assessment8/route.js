import dbConnect from "@/lib/db";
import Property from "@/models/Property";

export async function GET(req) {
  await dbConnect();

  const { ids, gpCode, year } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  const idArray = ids?.split(",") || [];

  // ✅ Fetch full property docs
  const properties = await Property.find({
    _id: { $in: idArray },
    gpCode,
    financialYear: year
  }).lean(); // lean = plain JS objects (perf boost)

  const result = properties.map((p, index) => {
    
    // ✅ Automatic calculated fields
    const area = Number(p.area) || 0;
    const rate = Number(p.readyReckonerRate) || 0;
    const buildingValue = area * rate;

    const depreciationRate = p?.depreciationRate ?? 10;
    const depreciatedValue =
      buildingValue - (buildingValue * depreciationRate) / 100;

    const buildingTax =
      (depreciatedValue * (p?.taxRate?.building || 0)) / 100;

    const waterTax = p?.taxRate?.water || 0;

    return {
      serial: index + 1,

      // ✅ full property object spread
      ...p, 

      // ✅ computed fields included in response 
      computed: {
        area,
        rate,
        buildingValue,
        depreciationRate,
        depreciatedValue,
        buildingTax: buildingTax.toFixed(2),
        waterTax: waterTax.toFixed(2)
      }
    };
  });

  return Response.json(result);
}
