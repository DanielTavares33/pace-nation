import { Button } from "@/components/ui/button";

export default function Welcome() {
    return (
        <>
            <h1 className="text-2xl font-bold">Welcome to Pace Nation!</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                This is the welcome page. You can edit this page at{" "}
                <code className="rounded bg-muted px-1 font-mono text-sm">
                    resources/js/pages/welcome.tsx
                </code>
                .
            </p>
            <Button className="mt-6" onClick={() => alert("Button clicked!")} variant="outline">
                Click me
            </Button>
        </>
    );
}
