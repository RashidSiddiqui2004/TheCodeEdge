
import slugify from "slugify";

export default function generateSlug(title: string, id: string): string {
    return slugify(title).toLowerCase() + `-${id}`;
}
